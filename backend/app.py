from flask import Flask, request, jsonify, render_template, flash, redirect, url_for, session, make_response
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo,MongoClient
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from datetime import datetime, timedelta
from bson import ObjectId
import jwt
import os, requests
#from flask_session import Session
from werkzeug.middleware.proxy_fix import ProxyFix


app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)
app.secret_key = "asdfghjklpoiuytrewqzxcvbnm1245789630"
CORS(app)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'evenuep@gmail.com'
app.config['MAIL_PASSWORD'] = 'ikgctozpigwihguo' 



mail = Mail(app)

app.config["MONGO_URI"] = "mongodb+srv://nipotdar:niks1234@cluster0.sfi1ax8.mongodb.net/test"
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
collection = mongo.db.venues
collection1 = mongo.db.users
collection2 = mongo.db.organize_events
collectionp = mongo.db.players



# @app.route('/home', methods = ["GET"])
# def home():
#     # sess = request.json.get("session")
#     # print(sess)
#     print(session)
#     if session:
#         if 'firstname' in session:
#             firstname = session['firstname']
#             email = session['email']
#     else:
#         firstname = ""
#         email = ""
#     print(email)
#     response = {
#         "session": session,
#         "firstname": firstname,
#         "email": email
#     }
#     return response

@app.route('/login', methods=["POST"])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    response = {
        "email": email,
        "password": password,
        "message": "Received Details"
    }   

    found_user = mongo.db.users.find_one({"email": email})
    if found_user:
        if bcrypt.check_password_hash(found_user['password'], password):
            
            #session['firstname'] = found_user['firstname']
            #session['lastname'] = found_user['lastname']
            session['email'] = found_user['email']
            session['_id'] = str(found_user['_id'])
            session['password'] = password

            
            response = {
                "email": email,
                "password": password,
                "message": "Login Successful"
            }
            

            
        else:
            response = {
               "message": "Wrong Password. Try Again."
            }
    else:

        response = {
            "message": "User not found"
        }

    requests.get('https://api.chatengine.io/users/me/', 
        headers={ 
            "Project-ID": "ec68f4f3-6dd4-481c-a361-d22931b1db7d",
            "Private-Key": "ebac1061-c5cc-456c-a02d-e8b3c7835759",
            "User-Name": email,
            "User-Secret": password,
            
        }
    )

    print(session)
    return response
    
@app.route('/register', methods=["POST"])
def register():
    firstname = request.json.get("firstname")
    lastname = request.json.get("lastname")
    phone = request.json.get("phone")
    email = request.json.get("email")
    password = request.json.get("password")
    usertype = request.json.get("usertype")
    organize = request.json.get("organized_events")
    events_booked = request.json.get("events_booked")
    venues_booked = request.json.get("venues_booked")

    userfind=collection1.find_one({"email":email})
    
    if(userfind==None):
        print("USER DEETS: " + firstname + ' ' + lastname)

        hash_pass = bcrypt.generate_password_hash(password).decode('utf-8')

        mongo.db.users.insert_one({
            "firstname": firstname,
            "lastname": lastname,
            "phone": phone,
            "usertype": usertype,
            "email": email,
            "password": hash_pass,
            "organized_events":organize,
            "events_booked":events_booked,
            "venues_booked":venues_booked
        })
        
        response = {
            "name": firstname + lastname,
            "message": "Registration successful"
        }

        requests.post('https://api.chatengine.io/users/', 
            data={
                "username":email,
                "secret": password,
                "email": email,
                "first_name": firstname,
                "last_name": lastname,
            },
            headers={ "Private-Key": "ebac1061-c5cc-456c-a02d-e8b3c7835759" }
        )
    else:
        response = {
            "message": "User already exists"
        }

    return response

   
@app.route('/logout')
def logout():
    session.clear()

    return {
        "message": "Logout successful"
    }



@app.route("/data")
def get_documents():

    name=request.args.get('name',default=None)
    #location=request.args.get('location',default=None)
    #capacity=request.args.get('capacity',default=None)
    city=request.args.get('city',default=None)
    state=request.args.get('state',default=None)
    venueName=request.args.get('venueName',default=None)
    search_query=request.args.get('search_query',default=None)
  
    query={}

    if search_query:
        regex = { '$regex': search_query, '$options': 'i' }
        query = {'$or': [{ 'name': regex },{ 'city': regex },{ 'state': regex },{ 'venueName': regex }]}
    if name:
        sports_list = name.split(',')
        query["name"]={"$in": sports_list}
    if city:
        sports_list = city.split(',')
        query["city"]={"$in": sports_list}
    if state:
        sports_list = state.split(',')
        query["state"]={"$in": sports_list}
    if venueName:
        sports_list = venueName.split(',')
        query["venueName"]={"$in": sports_list}

    
    """
    if capacity:
        sports_list = capacity.split(',')
        int_list = list(map(int, sports_list))
        query["capacity"]={"$in": int_list}
    """

    print(query)
    
    documents = list(collection.find(query))
    
    # convert from BSON to JSON format by converting all the values for the keys to string
    json_docs = []
    for doc in documents:
        json_doc = {}
        for key, value in doc.items():
            json_doc[key] = str(value)
        json_docs.append(json_doc)


    return jsonify(json_docs)

@app.route("/dataa")
def get_adocuments():
    age_range=request.args.get('age_range',default=None)
    activityName=request.args.get('activityName',default=None)
    cost=request.args.get('cost',default=None)
    city=request.args.get('city',default=None)
    state=request.args.get('state',default=None)
    search_query=request.args.get('search_query',default=None)

    query={}

    if search_query:
        regex = { '$regex': search_query, '$options': 'i' }
        query = {'$or': [{ 'age_range': regex },{ 'ename': regex },{ 'cost_type': regex },{ 'city': regex },{ 'state': regex }]}
    if age_range:
        sports_list = age_range.split(',')
        query["age_range"]={"$in": sports_list}
    if activityName:
        sports_list = activityName(',')
        query["ename"]={"$in": sports_list}
    if cost:
        sports_list = cost.split(',')
        if("paid" not in sports_list):
            query["cost_type"]="free"
        elif("free" not in sports_list):
            query["cost_type"]="paid"
    if city:
        sports_list = city.split(',')
        query["city"]={"$in": sports_list}
    if state:
        sports_list = state.split(',')
        query["state"]={"$in": sports_list}

    print(query)
    
    documents = list(collection2.find(query))
    
    # convert from BSON to JSON format by converting all the values for the keys to string
    json_docs = []
    for doc in documents:
        json_doc = {}
        for key, value in doc.items():
            json_doc[key] = str(value)
        json_docs.append(json_doc)
    return jsonify(json_docs)


@app.route("/datap")
def get_pdocuments():

    #name=request.args.get('name',default=None)
    age_range=request.args.get('age_range',default=None)
    interest=request.args.get('interest',default=None)
    gender=request.args.get('gender',default=None)
    skill_level=request.args.get('skill_level',default=None)
    search_query=request.args.get('search_query',default=None)

    #print(type_activity or name or location or city or capacity)

    query={}

    if search_query:
        regex = { '$regex': search_query, '$options': 'i' }
        query = {'$or': [{ 'age': regex },{ 'sports': regex },{ 'gender': regex },{ 'skill_level': regex }]}
    if age_range:
        sports_list = age_range.split(',')
        if len(sports_list)==1:
            if "18 and above" in sports_list:
                query["age"]={"$gte":18}
            elif "under 18" in sports_list:
                query["age"]={"$lt":18}
    if interest:
        sports_list = interest.split(',')
        query["sports"]={"$in": sports_list}
    if gender:
        sports_list = gender.split(',')
        query["gender"]={"$in": sports_list}
    if skill_level:
        sports_list = skill_level.split(',')
        query["skill_level"]={"$in": sports_list}

    print(query)
    
    documents = list(collection1.find(query))
    
    # convert from BSON to JSON format by converting all the values for the keys to string
    json_docs = []
    for doc in documents:
        json_doc = {}
        for key, value in doc.items():
            json_doc[key] = str(value)
        json_docs.append(json_doc)
    return jsonify(json_docs)


@app.route('/forgot password',methods=["POST"])
def forgot_password():
    email=request.json.get('email')
    userfind=collection1.find_one({"email":email})

    if(userfind!=None):
        user=str(userfind["_id"])
        EXPIRATION_TIME = 5 * 60

        payload = {
                'email': email,
                'exp': datetime.utcnow() + timedelta(seconds=EXPIRATION_TIME)
        }
        token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
        
        text="Reset Password Link"
        msg = Message(text,
                    sender="evenueproject@gmail.com",
                    recipients=[email])
        msg.body="This link will be only valid for 5 mins http://localhost:3000/resetpassword/"+user+"/"+token
        mail.send(msg)
    else:
        return "User does not exist"
    
    return 'Email sent'

@app.route("/resetpassword",methods=["POST"])
def reset_password():
    id=request.json.get("_id")
    password=request.json.get("password")

    hash_pass = bcrypt.generate_password_hash(password).decode('utf-8')

    collection1.find_one_and_update(
            { "_id": ObjectId(id) },
            {"$set": {"password": hash_pass}}
        )
    return "Password updated successfully"


@app.route('/profile')
def profile():


    if 'email' in session:
        document=list(collection1.find({"email":session["email"]}))

    
        json_docs = []
        for doc in document:
            json_doc = {}
            for key, value in doc.items():
                json_doc[key] = str(value)
            json_docs.append(json_doc)
        return {
            "session_email": session['email'],
            "user_details": json_doc
        }
    else:
        document={}
        json_docs=[]
        return {
            "session_email": "",
            "user_details": json_docs
        }

@app.route('/profile_data')
def profile_data():
    #id=ObjectId(session['_id'])
    find_email=session["email"]
    userfind=collection1.find_one({"email":find_email})
    print(userfind)
    userfind['_id'] = str(userfind['_id'])


    document = list(userfind["organized_events"])

    #print(document)

    
    json_docs = []
    for doc in document:
        json_doc = {}
        for key, value in doc.items():
            json_doc[key] = str(value)
        json_docs.append(json_doc)
    

    document1={}
    document1["_id"]=userfind["_id"]
    document1["firstname"]=userfind["firstname"]
    document1["lastname"]=userfind["lastname"]
    document1["email"]=userfind["email"]
    document1["organized_events"]=json_docs
    document1["password"]=session["password"]
    if("age" in userfind):
        document1["age"]=userfind["age"]
    if("gender" in userfind):
        document1["gender"]=userfind["gender"]
    if("city" in userfind):
        document1["city"]=userfind["city"]
    if("state" in userfind):
        document1["state"]=userfind["state"]
    if("skill_level" in userfind):
        document1["skill_level"]=userfind["skill_level"]
    if("availability" in userfind):
        document1["availability"]=userfind["availability"]
    if("sports" in userfind):
        document1["sports"]=userfind["sports"]
    
    return jsonify(document1)

@app.route('/update_user_details',methods=["POST"])
def update_user():
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    age = request.json.get('age')
    gender = request.json.get('gender')
    city = request.json.get('city')
    state = request.json.get('state')
    skill_level = request.json.get('skill_level')
    availability = request.json.get('availability')
    sports = request.json.get('sports')

    #id=ObjectId(session['_id'])

    document={}

    if(first_name!=None and first_name!="" and first_name.isspace()==False):
        document["firstname"]=first_name

    if(last_name!=None and last_name!="" and last_name.isspace()==False):
        document["lastname"]=last_name

    if(age!=None and age!="" and age.isspace()==False):
        document["age"]=int(age)

    if(gender!=None and gender!="" and gender.isspace()==False):
        document["gender"]=gender

    if(city!=None and city!="" and city.isspace()==False):
        document["city"]=city.lower()

    if(state!=None and state!="" and state.isspace()==False):
        document["state"]=state.lower()

    if(skill_level!=None and skill_level!="" and skill_level.isspace()==False):
        document["skill_level"]=skill_level
    
    if(availability!=None and availability!="" and availability.isspace()==False):
        document["availability"]=availability

    if(sports!=None and sports!="" and len(sports)>0):
        document["sports"]=sports

    collection1.find_one_and_update(
            { "email": session["email"] },
            {"$set": document}
        )

    return "user details updated successfully"


@app.route('/create_events',methods=["POST"])
def create_events():
    name = request.json.get('name')
    event_type = request.json.get("event_type")
    description=request.json.get("description")
    age_range=request.json.get("age_range")
    address=request.json.get("address")
    state=request.json.get("state")
    city=request.json.get("city")
    date=request.json.get("date")
    starttime=request.json.get("start_time")
    endtime=request.json.get("end_time")
    capacity=int(request.json.get("capacity"))
    cost=int(request.json.get("cost"))
    organizer=request.json.get("organizer")
    cost_type="free"

    if(cost>0):
        cost_type="paid"

    collection2.insert_one({"name":name,
                            "event_type":event_type,
                            "description":description,
                            "age_range":age_range,
                            "address":address,
                            "city":city,
                            "state":state,
                            "date":date,
                            "starttime":starttime,
                            "endtime":endtime,
                            "capacity":capacity,
                            "cost":cost,
                            "organizer":organizer,
                            "event_status":"open",
                            "cost_type":cost_type
                            })
    
    document = collection2.find_one({"name":name})


    collection1.find_one_and_update(
        {"email": session["email"]},
        {"$push": {"organized_events": document}}
        )
    
    return "event created successfully"

@app.route("/cancel_event",methods=["POST"])
def close_event():
    id=request.json.get("_id")
    ids=ObjectId(id)

    find_event=collection1.find(
        {"email":session["email"]},
        {"organized_events":{"$elemMatch": {"_id":ids}}}
    )
    

    collection2.find_one_and_update(
        {"_id":ids},
        {"$set":{"event_status":"closed"}}
        )
    
   # Retrieve the first document from the cursor
    matching_doc = find_event.next()

# Convert the document to a dictionary
    matching_dict = dict(matching_doc)

    

    #users = mongo.db.collection1.find({"events_booked": {"$elemMatch": {"name": matching_dict["name"]}}})

    #mail_users_array=[]
    #for user in users:
    #    mail_users_array.append(user["email"])

    mail_users_array=["rajagopalanshiwani@gmail.com","srajago@iu.edu"]
    for email in mail_users_array:
        text=":("+" "+"Event Cancelled"
        url="http://localhost:3000"
        msg = Message(text,
                    sender="evenueproject@gmail.com",
                    recipients=[email])
        msg.body="We're extremely sorry :( this event has been cancelled by the organizer. Please contact the organizer for more details or visit our website"+" "+url+" "+"to book another event or venue"
        mail.send(msg)
    
    result=collection1.update_one(
    {"email": session["email"]},
    {"$pull": {"organized_events": {"_id":ids}}}
    )

    if result.deleted_count > 0:
        return jsonify({'message': 'Record deleted successfully'}), 200
    
    return jsonify({'message': 'Record not found'}), 404

@app.route('/get_event_details')
def get_event_details():
    id=request.args.get("_id")
    e_id=request.args.get("e_id")

    document=collection2.find_one(
        {'_id': ObjectId(e_id)})
    
    document["_id"]=str(document["_id"])
    return jsonify(document)

@app.route('/update_event_details',methods=["POST"])
def update_event_details():
    userid=request.json.get("_id")
    e_id=request.json.get("e_id")

    name=request.json.get("name")
    event_type=request.json.get("event_type")
    description=request.json.get("description")
    age_range=request.json.get("age_range")
    address=request.json.get("address")
    location=request.json.get("location")
    date=request.json.get("date")
    start_time=request.json.get("start_time")
    end_time=request.json.get("end_time")
    capacity=request.json.get("capacity")
    cost=request.json.get("cost")

    document1={}

    if(name!=None):
        document1["name"]=name
    
    if(event_type!=None):
        document1["event_type"]=event_type
    
    if(description!=None):
        document1["description"]=description

    if(age_range!=None):
        document1["age_range"]=age_range
    
    if(address!=None):
        document1["address"]=address

    if(location!=None):
        document1["location"]=location

    if(date!=None):
        document1["date"]=date
    
    if(start_time!=None):
        document1["start_time"]=start_time
    
    if(end_time!=None):
        document1["end_time"]=end_time
    
    if(capacity!=None):
        document1["capacity"]=capacity

    if(cost!=None):
        document1["cost"]=cost

    collection2.find_one_and_update(
       {"_id":ObjectId(e_id)},
        {'$set':document1}
    )

    

    return "update was successful"


@app.route("/chat_authentication")
def get_chats():
    return jsonify({"email":session["email"],"password":session['password']})



if __name__ == '__name__':
    #app.run(debug = True)
    app.run(host="0.0.0.0",port=8080,debug=True)