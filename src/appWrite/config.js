import { Client, Storage, Databases, ID } from 'appwrite'
import conf from '../conf'

export class Services {
    databases
    bucket
    client = new Client()
    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.bucket = new Storage(this.client)
        this.databases = new Databases(this.client)

    }
    async addPost({ title, featuredImage, userId, content,AuthorName }) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                ID.unique(),
                {
                    'title': title,
                    'featuredImage': featuredImage,
                    'userId': userId,
                    'content': content,
                    'AuthorName': AuthorName
                })
        } catch (error) {
            console.error(error)

        }
    }
    async addProfile({ name,featuredImage, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionProfileId,
                ID.unique(),
                {

                    'featuredImage': featuredImage,
                    'userId': userId,
                    'name':name

                })
        } catch (error) {
            console.error(error)

        }
    }
    async deletePost($id) {
        try {
            return await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                $id
            )
        } catch (error) {
            console.error(error)
        }
    }
    async updatePost($id, { title, content, featuredImage }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                $id,
                {
                    'title': title,
                    'featuredImage': featuredImage,
                    'content': content

                }
            )
        }

        catch (error) {
            console.error(error)
        }
    }   
    async updateProfile($id, {name, userId, featuredImage }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionProfileId,
                $id,
                {
                    'userId': userId, 
                    'featuredImage': featuredImage,
                    'name':name
                }
            )
        }

        catch (error) {
            console.error(error)
        }
    }
    async getPost($id) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                $id
            )
        } catch (error) {
            console.error(error)

        }

    }
    async getPosts() {

        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId
            )
        } catch (error) {
            console.error(error)

        }

    }
    async getProfiles() {

        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionProfileId
            )
        } catch (error) {
            console.error(error)

        }

    }
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        }
        catch (error) {
            console.error(error)
        }

    }
    async deleteFile(fileId) {

        try {
            await this.bucket.deleteFile(conf.appWriteBucketId, fileId)

        } catch (error) {
            console.error(error)
        }
    }
    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.appWriteBucketId, fileId)

        } catch (error) {

        }
    }


}
const services = new Services()
export default services