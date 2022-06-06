export const getAgeOfDeath = (birth, death) => {
  if (birth) {
    let birthYear,
      deathYear,
      ageOfDeath,
      deathMonth,
      birthMonth,
      birthDay,
      deathDay,
      parsedBirth,
      parsedDeath;

    parsedBirth = birth.split("-");
    parsedDeath = death.split("-");

    birthYear = parsedBirth[0];
    deathYear = parsedDeath[0];
    birthMonth = parsedBirth[1];
    deathMonth = parsedDeath[1];
    birthDay = parsedBirth[2];
    deathDay = parsedDeath[2];

    //if they died on their birth month
    if (deathMonth == birthMonth) {
      //if they died before there birthday
      if (deathDay < birthDay) {
        ageOfDeath = deathYear - birthYear - 1;
      } else {
        ageOfDeath = deathYear - birthYear;
      }
      //if they died before there birthday
    } else if (deathMonth < birthMonth) {
      ageOfDeath = deathYear - birthYear - 1;
    } else {
      ageOfDeath = deathYear - birthYear;
    }

    return `age ${ageOfDeath}`;
  } else {
    return `unknown`;
  }
};

export const getDate = (date) => {
  if (date) {
    let year, day, month, parsedDated;
    const monthsArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    parsedDated = date.split("-");
    year = parsedDated[0];
    month = parsedDated[1].replace(/^0+/, "");
    day = parsedDated[2].replace(/^0+/, "");
    month = monthsArr[month - 1];

    return `${month} ${day}, ${year}`;
  } else {
    return "unknown";
  }
};
