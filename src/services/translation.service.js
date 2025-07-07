const translations = {
  en: {
    greeting(name) {
      return `Hello ${name}!`;
    },
    tell_us_a_little_about_yourself_so_we_can_give_you_the_best_suggestions:
      "Tell us a little about yourself so we can give you the best suggestions.",
    what_is_your_main_objective: "What is your main objective?",
    next_question: "Next question",
    what_roles_are_you_interested_in: "What roles are you interested in?",
    create_role: "Create role",
    find_your_role: "Find your role",
    see_more: "See more",
    almost_done: "Almost done!",
    what_area_are_you_currently_working_in:
      "What area are you currently working in?",
    find_your_current_job: "Find your current job",
    create_option: "Create option",
    last_question: "Last question!",
    what_is_your_highest_level_of_education:
      "What is your highest level of education?",
    finish: "Finish",
    previous: "Previous",
    next: "Next",
    my_courses: "My Courses",
    profile: "Profile",
    login: "Log In",
    logout: "Log out",
  },
  es: {
    greeting(name) {
      return `¡Hola ${name}!`;
    },
    tell_us_a_little_about_yourself_so_we_can_give_you_the_best_suggestions:
      "Cuéntanos un poco sobre ti para brindarte las mejores sugerencias.",
    what_is_your_main_objective: "¿Cuál es tu principal objetivo?",
    next_question: "Siguiente Pregunta",
    what_roles_are_you_interested_in: "¿Que roles te interesan?",
    create_role: "Crear rol",
    find_your_role: "Encuentra tu rol",
    see_more: "Ver más",
    almost_done: "¡Casi terminamos!",
    what_area_are_you_currently_working_in:
      "¿En qué área trabajas en este momento?",
    find_your_current_job: "Encuentra tu trabajo actual",
    create_option: "Crear opcion",
    last_question: "¡Última pregunta!",
    what_is_your_highest_level_of_education:
      "¿Cuál es tu nivel de educación más alto?",
    finish: "Finalizar",
    previous: "Previous",
    next: "Siguiente",
    my_courses: "Mis Cursos",
    profile: "Mi Perfil",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
  },
};

export const getTranslation = (language, key, ...props) => {
  const value = translations[language][key];

  if (typeof value === "function") {
    return value(...props);
  }

  return value;
};
