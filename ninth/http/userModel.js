var User = function(id, name, info, second, avatar, newfield, skills, isFullTime, phone, city, countryState, zip) {
    this.id = parseInt(id) || 0;
    this.name = name;
    this.info = info;
    this.second = second;
    this.avatar = avatar;
    this.newfield = newfield;
    this.skills = skills;
    this.isFullTime = isFullTime;
    this.phone = phone;
    this.address = new Address(city, countryState, zip);
}

var Address = function(city, countryState, zip) {
    this.city = city;
    this.countryState = countryState;
    this.zip = zip;
}