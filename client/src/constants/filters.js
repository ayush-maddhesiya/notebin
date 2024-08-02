const initialFilters = [
    {
      id: "year",
      name: "Year",
      options: [
        { value: "first", label: "First Year", checked: false },
        { value: "second", label: "Second Year", checked: false },
        { value: "third", label: "Third Year", checked: false },
        { value: "fourth", label: "Fourth Year", checked: false },
      ],
    },
    {
      id: "semester",
      name: "Semester",
      options: [
        { value: "first", label: "First Semester", checked: false },
        { value: "second", label: "Second Semester", checked: false },
        { value: "third", label: "Third Semester", checked: false },
        { value: "fourth", label: "Fourth Semester", checked: false },
        { value: "fifth", label: "Fifth Semester", checked: false },
        { value: "sixth", label: "Sixth Semester", checked: false },
        { value: "seventh", label: "Seventh Semester", checked: false },
        { value: "eight", label: "Eight Semester", checked: false },
      ],
    },
    // ... (others)
  ];
export default initialFilters;  