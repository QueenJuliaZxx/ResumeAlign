import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ResumeUploadPage, JDParserPage, ComparePage, InterviewPage, MatchPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume/upload" element={<ResumeUploadPage />} />
        <Route path="/jd/parser" element={<JDParserPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/match" element={<MatchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
