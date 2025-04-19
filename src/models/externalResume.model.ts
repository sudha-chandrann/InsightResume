import  { Schema, model, Model, models } from 'mongoose';

 interface ExternalResumeDocument {
    _id: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    createdAt: Date;
    updatedAt: Date;
  }


const ExternalResumeSchema = new Schema<ExternalResumeDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
      enum: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
    },
    fileSize: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ExternalResume = models.ExternalResume || model<ExternalResumeDocument>('ExternalResume', ExternalResumeSchema);

export default ExternalResume as Model<ExternalResumeDocument>;