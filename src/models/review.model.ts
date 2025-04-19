import mongoose, { Schema, model, Model, models } from 'mongoose';

interface ReviewDocument {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  resumeId?: mongoose.Types.ObjectId; 
  externalResumeId?: mongoose.Types.ObjectId; 
  overallScore: number;
  sections: {
    content: {
      score: number;
      feedback: string[];
      improvements: string[];
    };
    format: {
      score: number;
      feedback: string[];
      improvements: string[];
    };
    ats: {
      score: number;
      feedback: string[];
      improvements: string[];
    };
  };
  keywords: string[];
  missingKeywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: 'Resume',
    },
    externalResumeId: {
      type: Schema.Types.ObjectId,
      ref: 'ExternalResume',
    },
    overallScore: {
      type: Number,
      required: true,
    },
    sections: {
      content: {
        score: Number,
        feedback: [String],
        improvements: [String],
      },
      format: {
        score: Number,
        feedback: [String],
        improvements: [String],
      },
      ats: {
        score: Number,
        feedback: [String],
        improvements: [String],
      },
    },
    keywords: [String],
    missingKeywords: [String],
  },
  { timestamps: true }
);

// Validate that either resumeId or externalResumeId is provided
ReviewSchema.pre('save', function (next) {
  if (!this.resumeId && !this.externalResumeId) {
    throw new Error('A review must be associated with either a resume or an external resume');
  }
  next();
});

const Review = models.Review || model<ReviewDocument>('Review', ReviewSchema);

export default Review as Model<ReviewDocument>;