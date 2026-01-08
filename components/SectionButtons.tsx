interface SectionButtonsProps {
  sections: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SectionButtons({
  sections,
  activeSection,
  onSectionChange,
}: SectionButtonsProps) {
  const displaySections = sections.length > 0 ? sections : ["Food", "Drinks", "Desserts"];

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      {displaySections.map((section) => (
        <button
          key={section}
          className={`px-6 py-3 font-semibold rounded transition ${
            activeSection === section
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
          onClick={() => onSectionChange(section)}
        >
          {section}
        </button>
      ))}
    </div>
  );
}
