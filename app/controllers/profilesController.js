const express = require('express');
const passport = require('passport');
const Profile = require('../models/profile');
const { User } = require('../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

const router = express.Router();

//@route GET  profiles/test
//@desc Tests profiels route
//@access public
// router.get('/', (req, res) => {
//   console.log('hi');
//   res.send({ hi: 'profile' });
// });

router.get('/handle/:handle', async (req, res) => {
  try {
    let profile = await Profile.findOne({ handle: req.params.handle }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      res.status(404).send({ notice: 'There is no profile for this user' });
    }
    res.status(200).send(profile);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/user/:user_id', async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.user._id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      res.status(404).send({ notice: 'There is no profile for this user' });
    }
    res.status(200).send(profile);
  } catch (err) {
    res.status(404).send({ notice: 'There is no profile for this user' });
  }
});

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let userProfile = await Profile.findOne({ user: req.user._id }).populate(
        'user',
        ['name', 'avatar']
      );
      if (!userProfile) {
        res.status(404).send('There is no profile for this user');
      }
      res.status(200).json(userProfile);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.get('/all', async (req, res) => {
  try {
    let profile = await Profile.find().populate('user', ['name', 'avatar']);
    if (!profile) {
      res.status(404).json({ notice: 'there are no profiles' });
    }
    res.status(200).send(profile);
  } catch (err) {
    res.status(404).send({ notice: 'there are no profiles' });
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      res.status(400).send(errors);
    }
    const profileFields = {};
    profileFields.user = req.user._id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.gitHubUserName)
      profileFields.gitHubUserName = req.body.gitHubUserName;
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }
    //Socail
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;
    if (req.body.instagaram)
      profileFields.social.instagaram = req.body.instagaram;
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        let updateProfile = await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: profileFields },
          { new: true }
        );
        res.status(200).send(updateProfile);
      } else {
        let profile = await Profile.findOne({ handle: profileFields.handle });
        if (profile) {
          res.status(409).send('handle already exists');
        }
        let newProfile = await new Profile(profileFields).save();
        res.status(200).send(newProfile);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // console.log(req.body);
    const { errors, isValid } = validateExperienceInput(req.body);
    // console.log(errors);
    if (!isValid) {
      res.status(400).send(errors);
    }
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      profile.experience.unshift(newExp);
      let newProfile = await profile.save();
      res.status(200).send(newProfile);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    // console.log(errors);
    if (!isValid) {
      res.status(400).send(errors);
    }
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      profile.education.unshift(newEdu);
      let newProfile = await profile.save();
      res.status(200).send(newProfile);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        const removeIndex = profile.education
          .map(item => item._id)
          .indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        let deletedProfile = await profile.save();
        res.status(200).send(deletedProfile);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        const removeIndex = profile.experience
          .map(item => item._id)
          .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        let deletedProfile = await profile.save();
        res.status(200).send(deletedProfile);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let deletedProfile = await Profile.findOneAndRemove({
        user: req.user._id,
      });
      let userProfile = await User.findOneAndRemove({ _id: req.user._id });
      res.status(200).send({ sucess: true });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

module.exports = {
  profilesController: router,
};
