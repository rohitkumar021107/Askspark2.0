import PageLayout from '../components/PageLayout';
import { PlayCircle, Users } from 'lucide-react';

export default function LivePage() {
  const classes = [
    { title: "Advanced Mathematics", teacher: "Prof. Sharma", time: "Starts in 15 mins", students: 124 },
    { title: "Physics: Electromagnetism", teacher: "Dr. Rohit", time: "Ongoing", students: 89 },
  ];

  return (
    <PageLayout title="Live Classes">
      <div className="space-y-8">
        <div className="grid gap-6">
          {classes.map((c, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{c.title}</h3>
                  <p className="text-slate-500 font-medium">with {c.teacher}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-right hidden sm:block">
                  <p className="text-indigo-600 font-black text-xs uppercase">{c.time}</p>
                  <p className="text-slate-400 text-xs font-bold flex items-center gap-1 justify-end">
                    <Users className="w-3 h-3" /> {c.students} attending
                  </p>
                </div>
                <button className="btn-gradient px-6 py-2.5 text-xs whitespace-nowrap">
                  Join Room
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-8 bg-indigo-600/5 rounded-[32px] border border-indigo-100 flex flex-col items-center text-center">
          <p className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] mb-4">No waiting time</p>
          <h3 className="text-2xl font-black text-slate-800 mb-2">Can't see your class?</h3>
          <p className="text-slate-500 text-sm font-medium mb-6">Start a peer learning session or check the archives.</p>
          <button className="btn-secondary px-6 py-3 text-sm">
            View Schedule
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
