import cloudform, { S3 } from 'cloudform'

const bucketName = 'simenyan-front';
cloudform({
    Description: 'ssa tempate',
    Parameters: {},
    Mappings: {},
    Resources: {
        S3: new S3.Bucket({
            BucketName: bucketName,
            AccessControl: 'PublicRead',
            WebsiteConfiguration: new S3.Bucket.WebsiteConfiguration({ IndexDocument: 'index.html' })
        }),
        S3bucketPolicy: new S3.BucketPolicy({
            Bucket: bucketName,
            PolicyDocument: {
                Statement: [
                    {
                        Effect: "Allow",
                        Action: ['s3:GetObject'],
                        Principal: '*',
                        Resource: [`arn:aws:s3:::${bucketName}/*`]
                    }
                ]
            }
        })
    },
    Outputs: {}
});
