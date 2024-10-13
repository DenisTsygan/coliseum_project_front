function ruPluralizationRules(
    choice:number,//количество сообщений постов , то что прокидываем (индекс выбора, заданный входными данными для)
    choicesLength:number//общее количество доступных вариантов
  ) {
    if (choice === 0) {
      return 0
    }
    const teen = choice > 10 && choice < 20
    const endsWithOne = choice % 10 === 1
    if (!teen && endsWithOne) {
      return 1
    }
    if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
      return 2
    }
    return choicesLength < 4 ? 2 : 3
}
function uaPluralizationRules(
    choice:number,//количество сообщений постов
    choicesLength:number
  ) {
    if (choice === 0) {
      return 0
    }
    if(choice < 5){
      return 1
    }
    return 2
}
function enPluralizationRules(
    choice:number,//количество сообщений постов
    choicesLength:number
  ) {
    if (choice === 0) {
        return 0
    }

    if (choice === 1) {
      return 1
    }else{
        return 2
    }
}

  export default {
    en: enPluralizationRules,
    ru: ruPluralizationRules,
    ua: uaPluralizationRules,
  };