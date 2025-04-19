import  mongoose, { Schema, model, Model, models } from 'mongoose';

type FormValues = {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      title: string;
      summary: string;
    };
    education: Array<{
      id: string;
      school: string;
      degree: string;
      fieldOfStudy: string;
      startDate: string;
      endDate: string;
      CGPA: string;
    }>;
    experience: Array<{
      id: string;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
      bulletPoints: string[];
    }>;
    projects: Array<{
      id: string;
      title: string;
      liveLink: string;
      bulletPoints: string[];
    }>;
    positions: Array<{
      id: string;
      title: string;
      organization: string;
      startDate: string;
      endDate: string;
      bulletPoints: string[];
    }>;
    skills: Array<{
      id: string;
      category: string;
      name: string;
      level?: string;
    }>;
  }
  
 interface ResumeDocument {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    title: string;
    data: FormValues;
    template: string;
    createdAt: Date;
    updatedAt: Date;
  }


const ResumeSchema = new Schema<ResumeDocument>(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
      type: String,
      required: true,
      default: 'My Resume',
    },
    data: {
      type: Schema.Types.Mixed as unknown as FormValues,
      required: true,
    },
    template: {
      type: String,
      default: 'modern',
      enum: ['modern', 'classic'],
    },
  },
  { timestamps: true }
);

const Resume = models.Resume || model<ResumeDocument>('Resume', ResumeSchema);

export default Resume as Model<ResumeDocument>;