package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
	Name     string             `json:"name,omitempty" bson:"name,omitempty"`
	LastName string             `json:"lastName,omitempty" bson:"lastName,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`
}

type LoginUser struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserRegister struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	LastName string `json:"lastName"`
	Token    string `json:"token"`
}

//{
//"email",
//"password",
//"portfolio": {
//"favourites": [],
//"assets": {"Ethereum": {"Amount": 2.5}
//}
//},
//"football": {
//"default_league_id": 39,
//'supporting_team': 'Chelsea',
//
//}
//
//}
