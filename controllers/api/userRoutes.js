const router = require('express').Router();
const { User, Post } = require('../../models');

//Signup route
router.post('/', async (req,res)=>{
    try{
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(()=>{
            req.session.user_id = newUser.id;
            req.session.loggedIn = true;
            req.session.username = newUser.username;
            res.status(200).json(newUser);
        });
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

// Login Route
router.post('/login', async (req,res) => {
    try {
        const userData = await User.findOne({ 
            where: { username: req.body.username } ,
        });
        if (!userData) {
            res.status(400).json({ 
                message: 'No user with that username!' 
            });
            return;
        }
        
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword){
            res.status(400).json({
                message: 'No user found!'
            });
            return;
        }
        req.session.save(()=>{
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            req.session.username = userData.username;
            res.json({ 
                user: userData,
                message: "You are now logged in!" 
            });
        })
    }catch(err){
        res.status(400).json({message: 'No user found!'});
    }
});
// Logout Route
router.post('/logout', (req,res)=>{
    if (req.session.loggedIn){
        req.session.destroy(()=>{
        res.status(204).end();
        });
    }else{
        res.status(404).end();
    }
});

module.exports= router;