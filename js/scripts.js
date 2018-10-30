// BUSINESS LOGIC FOR ADDRESSBOOK
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
};

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true
      }
    }
  };
  return false;
};

// BUSINESS LOGIC FOR CONTACTS
function Contact(firstName, lastName, phoneNumber, emailAddress, streetAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailAddress = emailAddress,
  this.streetAddress = streetAddress
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};


// USER INTERFACE LOGIC
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.fullName() + "</li>";
  });

  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);

  var htmlStreetAddressToDisplay = "";
  contact.streetAddress.forEach(function(addressLine) {
    htmlStreetAddressToDisplay += "<p class='smalls'>" + addressLine + "</p>";
  });
  $(".street-address").html(htmlStreetAddressToDisplay);

  var buttons = $("#buttons");
  // buttons.empty();
  // buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
  buttons.html("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("mouseenter","li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  })
};

$(document).ready(function() {
  attachContactListeners();

  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();

    var streetAddress1 = $("input#new-street-address1").val();
    var streetAddress2 = $("input#new-street-address2").val();
    var city = $("input#new-city").val();
    var state = $("input#new-state").val();
    var postalCode = $("input#new-postal-code").val();

    var inputtedStreetAddress = [streetAddress1, streetAddress2, city, state, postalCode];


    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");

    $("input#new-street-address1").val("");
    $("input#new-street-address2").val("");
    $("input#new-city").val("");
    $("input#new-state").val("");
    $("input#new-postal-code").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedStreetAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
