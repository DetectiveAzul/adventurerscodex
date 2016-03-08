"use strict";

/**
 * Models an item in the user's backpack or something they
 * have equipped.
 */
function Item() {
	var self = this;
	self.ps = PersistenceService.register(Item, self);

	self.characterId = ko.observable(null);
	self.itemName = ko.observable('');
	self.itemType = ko.observable('');
	self.itemIsEquippable = ko.observable(false);
	self.itemBodyLocation = ko.observable('');
	self.itemDesc = ko.observable('');
	self.itemQty = ko.observable(1);
	self.itemWeight = ko.observable(0);
	self.itemCost = ko.observable(0);
	self.itemCurrencyDenomination = ko.observable('');

	self.totalWeight = ko.pureComputed(function() {
	    if (self.itemQty() && self.itemWeight()) {
            return parseInt(self.itemQty()) * parseFloat(self.itemWeight());
	    }
	    return 0;
	});

	self.clear = function() {
		self.itemName('');
		self.itemDesc('');
		self.itemQty('');
		self.itemWeight('');
		self.itemIsEquippable(false);
		self.itemBodyLocation('');
		self.itemCost(0);
		self.itemCurrencyDenomination('');
	};

	self.importValues = function(values) {
    	self.characterId(values.characterId);
		self.itemName(values.itemName);
		self.itemDesc(values.itemDesc);
		self.itemQty(values.itemQty);
		self.itemIsEquippable(values.itemIsEquippable);
		self.itemBodyLocation(values.itemBodyLocation);
		self.itemWeight(values.itemWeight);
		self.itemCost(values.itemCost);
		self.itemCurrencyDenomination(values.itemCurrencyDenomination);
	};

	self.exportValues = function() {
		var values = {};
        values.characterId = self.characterId();
		values.itemName = self.itemName();
		values.itemIsEquippable = self.itemIsEquippable();
		values.itemDesc = self.itemDesc();
		values.itemBodyLocation = self.itemBodyLocation();
		values.itemQty = self.itemQty();
		values.itemWeight = self.itemWeight();
		values.itemCost = self.itemCost();
		values.itemCurrencyDenomination = self.itemCurrencyDenomination();
		return values;
	};

	self.save = function() {
		self.ps.save();
	};

	self.delete = function() {
		self.ps.delete();
	};
};

Item.findAllBy = function(characterId) {
	return PersistenceService.findAll(Item).filter(function(e, i, _) {
		return e.characterId() === characterId;
	});
};
