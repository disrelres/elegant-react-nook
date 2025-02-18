
const FAQ = () => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#044bab] font-['Verdana']">Frequently Asked Questions</h1>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-black">
          <h2 className="text-lg font-bold mb-2 text-black font-['Verdana']">Is this tool free?</h2>
          <p className="text-black font-['Verdana']">Yes. But donations are greatly appreciated because keeping it up is not free to me.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-black">
          <h2 className="text-lg font-bold mb-2 text-black font-['Verdana']">Why is there no menu for selecting a specific disability?</h2>
          <p className="text-black font-['Verdana']">There are thousands of disabilities. Also, most of the organizations, themselves, don't list the specific disabilities they provide services to.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-black">
          <h2 className="text-lg font-bold mb-2 text-black font-['Verdana']">How can I inform you of an error or request an addition?</h2>
          <p className="text-black font-['Verdana']">Use the feedback form in the bottom right. Please provide OFFICIAL links for any request to add an organization.</p>
        </div>
      </div>
    </main>
  );
};

export default FAQ;
