
// check if the enviromental variables need to be updated 
// when heroku sleeps they get reset which leads to issues 
const checkPosts = async () => {
    
    const mostRecentPost =  await Posts.find().limit(1).sort({$natural:-1})
                    
    const mostRecentThread =  await Threads.find().limit(1).sort({$natural:-1})

    if (!mostRecentPost[0]){
        process.env.POSTCOUNT = 1
        
    }else{
        process.env.POSTCOUNT =  (mostRecentPost[0].postID + 1)
    }

    if (!mostRecentThread[0]){
        process.env.THREADCOUNT = 1
        
    }else{
        process.env.THREADCOUNT = (mostRecentThread[0].threadID + 1)
    }
}


module.exports = checkPosts;