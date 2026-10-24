export const events = [
  { icon:'bi-lightning-charge', day:'01', month:'NOV', title:'Opening & Team Formation', time:'09:00 AM – 10:00 AM', type:'Community' },
  { icon:'bi-code-slash', day:'01', month:'NOV', title:'Build Sprint Begins', time:'10:00 AM – 01:00 PM', type:'Workshop' },
  { icon:'bi-cup-hot', day:'01', month:'NOV', title:'Recharge & Mentor Hours', time:'01:00 PM – 02:00 PM', type:'Break' },
  { icon:'bi-trophy', day:'01', month:'NOV', title:'Project Demos & Showcase', time:'05:00 PM – 06:30 PM', type:'Showcase' },
]
export const projects = [
  {title:'Campus Connect', category:'Web app', image:'photo-1522202176988-66273c2fd55f', desc:'A smarter hub for students, resources, and campus events.'},
  {title:'GreenSteps', category:'Social impact', image:'photo-1473341304170-971304b4f9a3', desc:'Small sustainable habits, measured through a friendly dashboard.'},
  {title:'HealthBridge', category:'AI concept', image:'photo-1576091160399-112ba8d25d1d', desc:'A clear, accessible way to organize wellness information.'},
  {title:'SkillSprint', category:'Education', image:'photo-1516321318423-f06f85e504b3', desc:'Short learning paths that turn practice into momentum.'},
  {title:'CityPulse', category:'Data', image:'photo-1519501025264-65ba15a82390', desc:'Visualize city patterns with clean maps and useful insights.'},
  {title:'Creator Desk', category:'Productivity', image:'photo-1455390582262-044cdead277a', desc:'A calm workspace for planning, drafting, and publishing.'},
]
export const faqs = [
  ['What is Coding Night 2026?','A hackathon-style event concept for learners to collaborate, build, and present a project. Confirm official event details with the organizers.'],
  ['Do I need a team?','You can use the team formation section as a planning guide. Actual team rules depend on the official organizers.'],
  ['Can beginners participate?','The site is designed to welcome learners at different stages. Check the event organizer for official eligibility.'],
  ['Will my registration be saved?','Not yet. This is frontend-only; the registration form demonstrates validation and success UI but does not store data.'],
  ['How do I connect the AI assistant?','Connect the chatbot component to your Node.js API later. Keep provider API keys on the server, not in the browser.'],
]
export const imageUrl = (id, width=1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`