
var mongodb = require('mongodb');

var http = require("http");
var Client=require("node-rest-client").Client;
var options = {
		host: 'grailsgumballmachinev2.cfapps.io',
		path: '/gumballs/1',
        method: 'GET'

};
var i=0;
var info;
exports.getIndex = function(req, res){
	
	
	var uri = 'mongodb://viraj:1234@ds051960.mongolab.com:51960/cmpe226';
	
	mongodb.MongoClient.connect(uri, function(err, db) {
		
		var gumball = db.collection('gumball');
		gumball.find({}).toArray(function(err,docs){
			
			console.log(docs);
		   	if(docs[0].countGumballs)
			{
				info1=
					
				{
						id:docs[0].id,
						countGumballs:docs[0].countGumballs,
						modelNumber:docs[0].modelNumber,
						serialNumber:docs[0].serialNumber,
						state: "NoCoinState"
				};
			}
		   	else
		   	{
		   		info1=	
				{
						id:docs[0].id,
						countGumballs:docs[0].countGumballs,
						modelNumber:docs[0].modelNumber,
						serialNumber:docs[0].serialNumber,
						state: "NoCoinState"
				};
		   	}
				res.render('home',{page_title:"Edit Customers - Node.js",data:info1});
		});
	
	});
};


exports.getInsert=function(req,res)
{
	var state=req.param('state');
	var uri = 'mongodb://viraj:1234@ds051960.mongolab.com:51960/cmpe226';
	
	mongodb.MongoClient.connect(uri, function(err, db) {
		
		var gumball = db.collection('gumball');
		gumball.find({}).toArray(function(err,docs){
			
				info1=
					
				{
						id:docs[0].id,
						countGumballs:docs[0].countGumballs,
						modelNumber:docs[0].modelNumber,
						serialNumber:docs[0].serialNumber,
						state: "HasCoinState"
				};
			
				res.render('home',{page_title:"Edit Customers - Node.js",data:info1});
		});
	
	});
};







exports.getTurn=function(req,res)
{

	var client=new Client();	
	var state=req.param('state');
	var uri = 'mongodb://viraj:1234@ds051960.mongolab.com:51960/cmpe226';
		
		if(state=="NoCoinState" || state=="InsertCoinFirstState" || state=="YourGumballIsHere")	
		{
	
			var uri = 'mongodb://viraj:1234@ds051960.mongolab.com:51960/cmpe226';
			
			mongodb.MongoClient.connect(uri, function(err, db) {
				
				var gumball = db.collection('gumball');
				gumball.find({}).toArray(function(err,docs){
					
						info1=
							
						{
								id:docs[0].id,
								countGumballs:docs[0].countGumballs,
								modelNumber:docs[0].modelNumber,
								serialNumber:docs[0].serialNumber,
								state: "InsertCoinFirstState"
						};
					
						res.render('home',{page_title:"Edit Customers - Node.js",data:info1});
				});
			
			});		
		}
		else
		{
				

				mongodb.MongoClient.connect(uri, function(err, db) {
				
					var gumball = db.collection('gumball');
					gumball.find({}).toArray(function(err,docs){
						
						if (docs[0].countGumballs>0)
						{
							count=docs[0].countGumballs-1;
							gumball.update({id:1},{$set:{countGumballs:count}}, function(err,result){
								
								if (err)throw err;
								
								var info1=
								{
											id:docs[0].id,
												countGumballs:count,
													modelNumber:docs[0].modelNumber,
														serialNumber:docs[0].serialNumber,
															state:"YourGumballIsHere"
								
								}
								
								
								res.render('home',{page_title:"Edit Customers - Node.js",data:info1})
							});
							
						}
						else{
						
							var info1=
							{
									id:docs[0].id,
									countGumballs:docs[0].modelNumber,
									modelNumber:docs[0].modelNumber,
									serialNumber:docs[0].serialNumber,
									state:"NoGumballState"
							
							}
							res.render('home',{page_title:"Edit Customers - Node.js",data:info1});
						}
				
				});
			});			
		}
	};