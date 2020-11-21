const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// Get all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === +req.params.id);
  if (found) {
    res.json(members.filter((member) => member.id === +req.params.id));
  } else {
    res.status(400).json({ msg: 'Member not found' });
  }
});

// Create Member
router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newMember = {
    id: uuid.v4(),
    name,
    email,
    status: 'active',
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Error 404!' });
  }
  members.push(newMember);
  res.json(members);
});

// Update Member
router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === +req.params.id);

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === +req.params.id) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: 'Member updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: 'Member not found' });
  }
});
// Delete member

router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === +req.params.id);

  if (found) {
    const index = members.findIndex(
      (member) => member.id === parseInt(req.params.id)
    );
    members.splice(index, 1);
    res.json({ msg: 'member deleted', members });
  } else {
    res.status(400).json({ msg: 'Member not found' });
  }
});

module.exports = router;
