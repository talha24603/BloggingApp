const conf={
    appWriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appWriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteCollectionProfileId:String(import.meta.env.VITE_APPWRITE_COLLECTION_Profile_ID),
    appWriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}
export default conf