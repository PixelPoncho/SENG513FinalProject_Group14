const Joi = require("joi");

module.exports.userCreateSchema = Joi.object({
	user: Joi.object({
		name: Joi.string().required(),
		username: Joi.string().required(),
		password: Joi.string().required(),
	}).required(),
});

module.exports.userLoginSchema = Joi.object({
	user: Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required(),
	}).required(),
});

module.exports.userUpdateSchema = Joi.object({
	user: Joi.object({
		name: Joi.string(),
		username: Joi.string(),
		password: Joi.string(),
		avatar: Joi.object({
			skinColour: Joi.object,
			topType: Joi.object,
			hairColour: Joi.object,
			clothing: Joi.object,
			clothingColour: Joi.object
		}),
	}).required(),
});

module.exports.classRoomCreateSchema = Joi.object({
	classRoom: Joi.object({
		name: Joi.string().required(),
	}).required(),
});