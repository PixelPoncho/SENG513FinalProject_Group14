const Joi = require("joi");

module.exports.userCreateSchema = Joi.object({
	user: Joi.object({
		username: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string().required(),
	}).required(),
});

module.exports.userLoginSchema = Joi.object({
	user: Joi.object({
		email: Joi.string().required(),
		password: Joi.string().required(),
	}).required(),
});

module.exports.userUpdateSchema = Joi.object({
	user: Joi.object({
		name: Joi.string(),
		username: Joi.string(),
		password: Joi.string(),
		chatColour: Joi.string(),
		avatar: Joi.object({
			skin: Joi.string(),
			topType: Joi.string(),
			hairColour: Joi.string(),
			clothingType: Joi.string(),
			clothingColour: Joi.string()
		}),
	}).required(),
});

module.exports.classRoomCreateSchema = Joi.object({
	classRoom: Joi.object({
		name: Joi.string().required(),
	}).required(),
});