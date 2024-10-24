const db = require('../models');
const Profile = db.Profile;

exports.create = (req, res) => { 
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Profile
  const profile = new Profile({
    username: req.body.username,
    motto: req.body.motto,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    idol: req.body.idol,
    photo: req.body.photo
  });
  // Save Profile in the database
  profile
    .save(profile)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Profile.',
      });
    });
};

exports.findAll = (req, res) => {
    Profile.find(
      {},
      {
        username: 1,
        moto: 1,
        firstName: 1,
        middleName: 1,
        lastName: 1,
        idol: 1,
        photo: 1,
        _id: 0,
      }
    )
      .sort({ username: 1 }) // Sort by name in ascending order
      .then((data) => {        
        // Create a new array with ordered objects *additionalInfo* at bottom
        const orderedData = data.map(profile => ({
          username: profile.username,
          motto: profile.motto,
          firstName: profile.firstName,
          middleName: profile.middleName,
          lastName: profile.lastName,
          idol: profile.idol,
          photo: profile.photo,
        }));
        res.send(orderedData); // Send the newly ordered data
        // res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving profiles.',
        });
      }); 
    }

// Find a single Profile with an id
exports.findOne = (req, res) => {
  const username = req.params.username; 
  Profile.find({ username: username })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: 'Profile with username ' + username + ' not found!'});
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Profile with username: "' + username + '"',
      });
    });
};

// Update a Profile by the username in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Fields to update',
        required: true,
         '@schema': {
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "example": "Updated username"
            },
            "firstName": {
              "type": "string",
              "example": "Updated firstName"
            },
            "middleName": {
              "type": "string",
              "example": "Updated middleName"
            },
            "lastName": {
              "type": "string",
              "example": "Updated lastName"
            },
            "idol": {
              "type": "string",
              "example": "Updated idol"
            },
            "photo": {
              "type": "string",
              "example": "Updated photo"
            }
          },
          "required": "idol"
        }
      }
    }
  */

  const username = req.params.username;

  Profile.findOneAndUpdate({ username: username }, req.body, { new: true, runValidators: true, useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Profile with username=${username}. Maybe Profile was not found!`,
        });
      } else res.send({ message: 'Profile was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Profile with username=' + username,
      });
    });
};

// Delete a Profile with the specified username in the request
exports.delete = (req, res) => {
  const username = req.params.username;

  Profile.findOneAndDelete({ username: username })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Profile with username=${username}. Maybe Profile was not found!`,
        });
      } else {
        res.send({
          message: 'Profile was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Profile with username=' + username,
      });
    });
};