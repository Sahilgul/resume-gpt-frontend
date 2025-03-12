// import React, { useEffect, useState } from "react";

// import ReactMarkdown from "react-markdown";

// const History = () => {
//   const [historyData, setHistoryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No authentication token found. Please log in.");
//         }

//         const response = await fetch("http://127.0.0.1:8000/resume/history", {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(
//             response.status === 401
//               ? "Unauthorized. Please log in again."
//               : "Failed to fetch history data."
//           );
//         }

//         const data = await response.json();
//         setHistoryData(data);
//       } catch (error) {
//         console.error("Error fetching history:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);


//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Resume Analysis History</h1>

//       {loading ? (
//         <p>Loading history...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : historyData.length > 0 ? (
//         historyData.map((entry) => (
//           <div key={entry.id} className="border p-4 mb-6 rounded shadow">
//             <h2 className="text-xl font-semibold">History ID: {entry.id}</h2>

//             {/* Technical Skills Table */}
//             <div className="overflow-x-auto mt-4">
//               <h3 className="text-lg font-semibold mb-2">Matched Technical Skills</h3>
//               <table className="min-w-full border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="border px-4 py-2">Job Skill</th>
//                     <th className="border px-4 py-2">Resume Skill</th>
//                     <th className="border px-4 py-2">Similarity</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {entry.matched_tech_skills.map((skill, index) => (
//                     <tr key={index} className="border">
//                       <td className="border px-4 py-2">{skill.job_skill}</td>
//                       <td className="border px-4 py-2">{skill.resume_skill}</td>
//                       <td className="border px-4 py-2">{(skill.similarity * 100).toFixed(2)}%</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Soft Skills Table */}
//             <div className="overflow-x-auto mt-4">
//               <h3 className="text-lg font-semibold mb-2">Matched Soft Skills</h3>
//               <table className="min-w-full border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="border px-4 py-2">Job Skill</th>
//                     <th className="border px-4 py-2">Resume Skill</th>
//                     <th className="border px-4 py-2">Similarity</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {entry.matched_soft_skills.map((skill, index) => (
//                     <tr key={index} className="border">
//                       <td className="border px-4 py-2">{skill.job_skill}</td>
//                       <td className="border px-4 py-2">{skill.resume_skill}</td>
//                       <td className="border px-4 py-2">{(skill.similarity * 100).toFixed(2)}%</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Missing Skills */}
//             <div className="mt-4">
//               <h3 className="text-lg font-semibold mb-2">Missing Skills</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <h4 className="font-medium">Technical Skills</h4>
//                   {entry.missing_tech_skills.length > 0 ? (
//                     <ul className="list-disc ml-6">
//                       {entry.missing_tech_skills.map((skill, index) => (
//                         <li key={index}>{skill}</li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-gray-600">None</p>
//                   )}
//                 </div>

//                 <div>
//                   <h4 className="font-medium">Soft Skills</h4>
//                   {entry.missing_soft_skills.length > 0 ? (
//                     <ul className="list-disc ml-6">
//                       {entry.missing_soft_skills.map((skill, index) => (
//                         <li key={index}>{skill}</li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-gray-600">None</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Resume Feedback */}
//             <div className="mt-4">
//               <h3 className="text-lg font-semibold mb-2">Resume Feedback</h3>
//               <div className="bg-gray-100 p-3 rounded">
//                 <pre className="whitespace-pre-wrap text-sm text-gray-800">
//                   {/* {entry.suggestions} */}
//                   <ReactMarkdown className="prose">{entry.suggestions}</ReactMarkdown>
//                 </pre>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center py-4">No history found.</p>
//       )}
//     </div>
//   );
// };

// export default History;



import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await fetch("http://127.0.0.1:8000/resume/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? "Unauthorized. Please log in again."
              : "Failed to fetch history data."
          );
        }

        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error("Error fetching history:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Resume Analysis History</h1>

      {loading ? (
        <p>Loading history...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : historyData.length > 0 ? (
        historyData.map((entry) => (
          <div key={entry.id} className="border p-4 mb-6 rounded shadow">
            <h2 className="text-xl font-semibold">History ID: {entry.id}</h2>

            {/* Technical Skills Table */}
            <div className="overflow-x-auto mt-4">
              <h3 className="text-lg font-semibold mb-2">Matched Technical Skills</h3>
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Job Skill</th>
                    <th className="border px-4 py-2">Resume Skill</th>
                    <th className="border px-4 py-2">Similarity</th>
                  </tr>
                </thead>
                <tbody>
                  {entry.matched_tech_skills.map((skill, index) => (
                    <tr key={index} className="border">
                      <td className="border px-4 py-2">{skill.job_skill}</td>
                      <td className="border px-4 py-2">{skill.resume_skill}</td>
                      <td className="border px-4 py-2">{(skill.similarity * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Soft Skills Table */}
            <div className="overflow-x-auto mt-4">
              <h3 className="text-lg font-semibold mb-2">Matched Soft Skills</h3>
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Job Skill</th>
                    <th className="border px-4 py-2">Resume Skill</th>
                    <th className="border px-4 py-2">Similarity</th>
                  </tr>
                </thead>
                <tbody>
                  {entry.matched_soft_skills.map((skill, index) => (
                    <tr key={index} className="border">
                      <td className="border px-4 py-2">{skill.job_skill}</td>
                      <td className="border px-4 py-2">{skill.resume_skill}</td>
                      <td className="border px-4 py-2">{(skill.similarity * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Missing Skills */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Missing Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Technical Skills</h4>
                  {entry.missing_tech_skills.length > 0 ? (
                    <ul className="list-disc ml-6">
                      {entry.missing_tech_skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">None</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium">Soft Skills</h4>
                  {entry.missing_soft_skills.length > 0 ? (
                    <ul className="list-disc ml-6">
                      {entry.missing_soft_skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">None</p>
                  )}
                </div>
              </div>
            </div>

            {/* Resume Feedback */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Resume Feedback</h3>
              <div className="bg-gray-100 p-3 rounded">
                {typeof entry.suggestions === "string" ? (
                  <ReactMarkdown>{entry.suggestions}</ReactMarkdown>
                ) : (
                  <p className="text-sm text-gray-800">
                    {JSON.stringify(entry.suggestions)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-4">No history found.</p>
      )}
    </div>
  );
};

export default History;
