# InsightResume - AI-Powered Resume Builder and Reviewer

![InsightResume](https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&auto=format&fit=crop)

InsightResume is a comprehensive AI-powered application that helps users create professional resumes and get detailed feedback on their existing resumes. The application leverages AI to provide personalized suggestions, optimize for ATS (Applicant Tracking Systems), and improve overall resume quality.

## Features

### Resume Builder
- Interactive form-based resume creation
- Multiple professional templates to choose from
- AI-powered suggestions for resume content
- Live preview as you build your resume
- Section-by-section guidance for optimal content
- Export to PDF functionality

### Resume Review
- Upload and analyze existing resumes (PDF, DOCX, TXT formats)
- Comprehensive AI analysis of content, format, and ATS compatibility
- Detailed scoring with specific improvement suggestions
- Keyword analysis for job matching
- One-click improved resume generation

### User Dashboard
- Manage multiple resumes for different positions
- Track resume improvement over time
- View application statistics
- Analyze keyword usage and optimization

## Tech Stack

### Frontend
- Next js  with TypeScript
- TailwindCSS for styling
- shadcn/ui component library
- Recharts for data visualization
- Lucide React for icons

### Backend
- Next.js API routes
- AI integration for resume analysis and suggestions

## Installation and Setup

1. Clone the repository:
```bash
git https://github.com/sudha-chandrann/InsightResume.git
cd InsightResume
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=your_api_url
AI_SERVICE_API_KEY=your_api_key
```

## AI Integration

The application can integrate with various AI services for resume analysis and suggestions:

- OpenAI's GPT for content generation and improvement suggestions
- Natural Language Processing (NLP) for keyword extraction and optimization
- Machine Learning models for ATS compatibility scoring

## Deployment

The application can be deployed to various hosting platforms:

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- Integration with job boards for direct application
- Cover letter generation
- LinkedIn profile optimization
- Interview preparation tools
- Premium templates and advanced formatting options

---



