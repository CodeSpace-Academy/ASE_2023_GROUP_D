import mongoose from 'mongoose'

const connectMongodb = () => {
    try {
        mongoose.connect(`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mzswurt.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`)
        console.log('Connected to mongodb')
    }
    catch (error) {
        console.log(error)
    }
}

export default connectMongodb;