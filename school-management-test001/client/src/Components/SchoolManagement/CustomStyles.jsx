

export const CustomStyles = {
    container: (provided) => ({
        ...provided,
        width:'100%',
        // transform:"rotate(180deg)",
        // direction:'rtl',
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: '0.9rem',
        backgroundColor: '#FFF',
        borderColor: '#dfe1df',
        border: '1.5px solid #dfe1df',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#dfe1df',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#d9fea3' : '#fff',
        color: state.isSelected ? '#000' : '#333',
        paddingRight:'1rem',
        '&:hover': {
            backgroundColor: '#d9fea3',
        },
        borderRadius: '0.7rem'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'grey', // Change this to your desired color
        fontSize: '1rem', // Optional: Adjust font size
        marginLeft:'10px'

      }),
    singleValue: (provided) => ({
        ...provided,
        color: '#000',
        marginLeft:'10px'
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,
        borderRadius: '0.9rem',
        padding: '0.1rem 0.3rem',
        // bottom: '100%', 
        // top: 'auto', 
    }),
};

export const CareCustomStyles = {
    container: (provided) => ({
        ...provided,
        width:'100%',
        // transform:"rotate(180deg)",
        // direction:'rtl',
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: '0.9rem',
        backgroundColor: '#FFF',
        borderColor: '#dfe1df',
        border: '1.5px solid #dfe1df',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#dfe1df',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#d9fea3' : '#fff',
        color: state.isSelected ? '#000' : '#333',
        '&:hover': {
            backgroundColor: '#d9fea3',
        },
        borderRadius: '0.7rem'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#6c6d6c', // Change this to your desired color
        fontSize: '1rem', // Optional: Adjust font size
        marginLeft:'10px',
      }),
    singleValue: (provided) => ({
        ...provided,
        color: '#000',
        marginLeft:'5px'

    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,
        borderRadius: '0.9rem',
        padding: '0.1rem 0.3rem',
        bottom: '100%', 
        top: 'auto', 
    }),
};



export const CustomCountry = {
    container: (provided) => ({
      ...provided,
      borderRadius: '1rem',
      border: '1px solid #ccc',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderRadius: '1rem',
      borderColor: '#ccc',
      border:'0',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'black', // Custom placeholder color
    }),
  };
  
