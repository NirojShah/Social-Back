const {
    default: mongoose
} = require("mongoose")
const friendModel = require("../model/friends")
const requestModel = require("../model/request.js")
const userModel = require("../model/user")


const addFriend = async (req, res) => {
    try {
        let existing = await friendModel.findOne({
            user: req.user._id
        })
        if (existing) {
            await existing.populate("friends")
            if (existing.friends.includes(req.params.id)) {
                return res.status(200).json({
                    msg: "success",
                    data: {
                        existing
                    }
                })
            }
            existing.friends.push(req.params.id)
            await existing.save()
            return res.status(200).json({
                status: "success",
                data: {
                    existing
                }
            })
        } else {
            existing = await friendModel.create({
                user: req.user._id
            })
            existing.friends.push(req.params.id)
            await existing.save()
            await existing.populate("friends")
            res.status(200).json({
                status: "success",
                data: {
                    existing
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message
        })
    }
}

const removeFriend = async (req, res) => {
    try {
        let removedFriend = await friendModel.findOne({
            user: req.user._id
        })
        if (removedFriend.friends.length > 1) {
            removedFriend.friends.splice(removedFriend.friends.indexOf(req.params.id), 1)
            await removedFriend.save()
        } else {
            removedFriend.friends = new Array()
            await removedFriend.save()
        }
        res.status(200).json({
            status: "success",
            data: {
                removedFriend
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message
        })
    }
}

const getFriends = async (req, res) => {
    try {
        let friends = await friendModel.findOne({
            user: req.user._id
        }).populate("friends")

        if (friends) {
            return res.status(200).json({
                status: "success",
                data: {
                    friends
                }
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                friends: []
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message
        })
    }
}

const sentRequest = async (req, res) => {
    try {
        const sRequest = await requestModel.findOne({user:req.params.id})
        if(!sRequest){
            const sRequest = await requestModel.create({
                user:req.params.id
            })
            sRequest.request.push(req.user._id)
            sRequest.save()
            return res.status(200).json({
                status:"success",
                data:{sRequest}
            })
        }
        if(sRequest.request.includes(req.user._id)){
            return res.status(200).json({
                status:"success",
                data:{sRequest}
            })
        }
        sRequest.request.push(req.user._id)
        sRequest.save()

        res.status(200).json({
            status:"success",
            data:{
                sRequest
            }
        })
    } catch (error) {
        res.status(401).json({
            status: "failed",
            msg: error.message
        })
    }
}

const acceptRequest = async (req, res) => {
    try {
        const myFriend = await friendModel.findOne({user:req.user._id})
        const friendsFriend = await friendModel.findOne({user:req.params.id})
        if(!myFriend && !friendsFriend){

            const myFriend = await friendModel.create({user:req.user._id})
            myFriend.friends.push(req.params.id)
            myFriend.save()
            
            const friendsFriend = await friendModel.create({user:req.params.id})
            friendsFriend.friends.push(req.user._id)
            friendsFriend.save()

            await requestModel.findOneAndUpdate({ user: req.user._id }, { $pull: { request: req.params.id } });

            return res.status(200).json({
                status:"success",
                data:{
                    myFriend
                }
            })
        }
        else if(!myFriend){
            const myFriend = await friendModel.create({
                user:req.user._id
            })
            myFriend.friends.push(req.params.id)
            myFriend.save()
            friendsFriend.friends.push(req.user._id)
            friendsFriend.save()

            await requestModel.findOneAndUpdate({ user: req.user._id }, { $pull: { request: req.params.id } });


            return res.status(200).json({
                status:"success",
                data:{
                    myFriend
                }
            })
        }
        else if(!friendsFriend){
            const friendsFriend = await friendModel.create({
                user:req.params.id
            })
            friendsFriend.friends.push(req.user._id)
            friendsFriend.save()

            myFriend.friends.push(req.params.id)
            myFriend.save()

            await requestModel.findOneAndUpdate({ user: req.user._id }, { $pull: { request: req.params.id } });


            return res.status(200).json({
                status:"success",
                data:{
                    myFriend
                }
            })
        }

        if(myFriend.friends.includes(req.params.id) && friendsFriend.includes(req.user._id)){

            await requestModel.findOneAndUpdate({ user: req.user._id }, { $pull: { request: req.params.id } });

            return res.status(200).json({
                status:"success",
                data:{
                    myFriend
                }
            })
        }

        myFriend.friends.push(req.params.id)
        myFriend.save()
        friendsFriend.friends.push(req.user._id)
        friendsFriend.save()

        await requestModel.findOneAndUpdate({ user: req.user._id }, { $pull: { request: req.params.id } });

        res.status(200).json({
            status:"success",
            data:{
                myFriend
            }
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message,
            stack:error.stack
        })
    }
}

const myRequest = async (req, res) => {
    try {
        const myReq = await requestModel.findOne({
            user: req.user._id
        }).populate("request", "name")
        res.status(200).json({
            status: "success",
            data: {
                myReq
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message
        })
    }
}

module.exports = {
    addFriend,
    removeFriend,
    getFriends,
    sentRequest,
    acceptRequest,
    myRequest
}