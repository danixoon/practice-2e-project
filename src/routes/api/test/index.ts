import { Router } from "express";
import * as joi from "joi";
import * as bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { validateAuth } from "../../../middleware/auth";
import { signToken, createError } from "../../../utils";
import User, { UserSchema } from "../../../models/User";
import { validateQuery } from "../../../middleware/validate";

import { createSchema as createUserSchema, createUser } from "../account";
import Building, { BuildingSchema } from "../../../models/Building";
import Room, { RoomSchema } from "../../../models/Room";
import BuildingUser, { BuildingUserSchema } from "../../../models/BuildingUser";
import { ServiceSchema, ServiceType } from "../../../models/Service";
import ServiceProvider, { ServiceProviderSchema, ServiceProviderType } from "../../../models/ServiceProvider";
import ServiceSubscription, { ServiceSubscriptionSchema, SubscriptionPaymentType, SubscriptionScheduleType } from "../../../models/ServiceSubscription";

const router = Router();

router.get("/role/user", validateAuth("user"), (req, res) => {
  res.status(200).send();
});

router.get("/role/admin", validateAuth("admin"), (req, res) => {
  res.status(200).send();
});

router.get("/token/admin", async (req, res, next) => {
  const adminUser = await User.findOne({ "account.username": "admin" }).exec();
  if (!adminUser) return next(createError(400, "main admin doesn't exists"));
  const token = signToken({ userId: adminUser.id });

  res.status(200).send({ token });
});

const createAdminUser = async (password: string) => {
  const adminUser = await User.findOne({ "account.username": "admin" }).exec();

  if (adminUser) throw createError(422, "main admin already created");

  const userDoc: UserSchema = {
    account: {
      username: "admin",
      password: await bcrypt.hash(password, 15)
    },
    profile: {
      firstname: "admin",
      lastname: "admin",
      middlename: "admin",
      dob: new Date()
    },
    role: "admin"
  };
  const user = await new User(userDoc).save();
  return user;
};

router.post(
  "/user/admin",
  validateQuery({
    password: joi
      .string()
      .required()
      .min(3)
  }),
  async (req, res, next) => {
    const { password } = req.query;

    const user = await createAdminUser(password).catch(next);
    if (user) return res.status(200).send(user.toObject());
  }
);

// Позволяет заполнить базу данных
router.get("/database/fill", async (req, res, next) => {
  await mongoose.connection.dropDatabase();
  const adminUser = await createAdminUser("admin");
  const user = await createUser({ username: "dane4ka", password: "12345", dob: "24.10.2000", firstname: "Даниил", lastname: "Бомбенков", middlename: "", role: "user" });

  const buildingDoc: BuildingSchema = {
    number: "2A",
    specs: {
      constructionDate: new Date(),
      floors: 3
    }
  };
  const building = await new Building(buildingDoc).save();

  const roomDoc: RoomSchema = {
    buildingId: building.id,
    number: 30,
    specs: {
      rooms: 3,
      square: 70
    }
  };
  const room = await new Room(roomDoc).save();

  const buildingUserDoc: BuildingUserSchema = {
    buildingId: building.id,
    roomId: room.id,
    userId: user.id
  };
  const buildingUser = await new BuildingUser(buildingUserDoc).save();

  const serviceProviderDoc: ServiceProviderSchema = {
    name: "SecurityABC",
    type: ServiceProviderType.outsource
  };
  const serviceProvider = await new ServiceProvider(serviceProviderDoc).save();

  const serviceSubscriptionDoc: ServiceSubscriptionSchema = {
    paymentType: SubscriptionPaymentType.fixed,
    scheduleType: SubscriptionScheduleType.monthly,
    price: 10000
  };
  const serviceSubscription = await new ServiceSubscription(serviceProviderDoc).save();

  const serviceDoc: ServiceSchema = {
    name: "Служба безопасности",
    description: "Предоставляет услуги безопасности для квартиры",
    required: false,
    type: ServiceType.room,
    providerId: serviceProvider.id,
    subscriptionId: serviceSubscription.id
  };
});

export default router;
