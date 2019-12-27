import { Router } from "express";
import { validateAuth } from "../../../middleware/auth";
import Building, { BuildingSchema } from "../../../models/Building";
import BuildingUser, { BuildingUserSchema } from "../../../models/BuildingUser";
import * as joi from "joi";
import { validateQuery } from "../../../middleware/validate";
import User from "../../../models/User";
import { createError } from "../../../utils";
import Room, { RoomSchema } from "../../../models/Room";

import * as _ from "lodash";

const router = Router();

router.get("/", validateAuth("user"), async (req, res) => {
  const { id } = req.params;
  const buildings = await BuildingUser.find({ userId: id })
    .populate("buildingId")
    .exec();

  res.status(200).send("owo");
});

const postBuildingSchema: joi.SchemaMap = {
  number: joi.string().required(),
  constructionDate: joi.date().required(),
  floors: joi.number().required(),
  apartaments: joi.number().required()
};
router.post("/", validateAuth("admin"), validateQuery(postBuildingSchema), async (req, res) => {
  const { number, constructionDate, floors, apartaments } = req.query;
  const buildingDoc: BuildingSchema = {
    number,
    specs: {
      constructionDate,
      floors
    }
  };

  try {
    const building = new Building(buildingDoc);
    const rooms = Room.create(
      _.range(apartaments).map(v => {
        const roomDoc: RoomSchema = {
          number: v,
          buildingId: building.id,
          specs: {
            rooms: 2,
            square: 100
          }
        };
        return roomDoc;
      })
    );

    await Promise.all([building.save(), rooms]);
    res.status(200).send(building.toObject());
  } catch (e) {
    res.status(500).send();
  }
});

router.put(
  "/user",
  validateAuth("admin"),
  validateQuery({
    userId: joi.string().required(),
    buildingId: joi.string().required(),
    roomId: joi.string().required()
  }),
  async (req, res, next) => {
    const { userId, buildingId, roomId } = req.query;
    const [user, building, room] = await Promise.all([User.findById(userId).exec(), Building.findById(buildingId).exec(), Room.findById(roomId).exec()]);

    if (!user || user.role === "admin") return next(createError(400, "invalid userId"));
    if (!building) return next(createError(400, "invalid buildingId"));
    if (!room) return next(createError(400, "invalid roomId"));

    const buildingUserDoc: BuildingUserSchema = {
      buildingId,
      roomId,
      userId
    };
    const buildingUser = await new BuildingUser(buildingUserDoc).save();

    res.status(200).send(buildingUser.toObject());
  }
);

export default router;
