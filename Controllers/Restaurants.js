const Restaurants=require('../models/Restaurants');

exports.getAllRestaurants=(req,res)=>{

    Restaurants.find().then((success)=>{
        
        res.status(200).json({
            
            message:"restaurants has been fetched successfully",
            RestaurantData:success
        })
    }).catch((err)=>{

        res.status(500).json({
            message:"error while fetching data",
            Error:err
        })
    })
}
//getging all restaurants by the name fo the restaurant
exports.getRestaurantByName=(req,res)=>{

    const rest_name=req.params.name;

    Restaurants.find({name:rest_name}).then((success)=>{

        res.status(200).json({
            message:"data fetched succefully",
            RestaurantData:success
        })
    }).catch((err)=>{

        res.status(500).json({

            message:"data fetching failed",
            Error:err
        })
    })
}

//getting all restaurants by the city of the restaurant
exports.getRestaurantByCity=(req,res)=>{

    const rest_city=req.params.city;

    Restaurants.find({city:rest_city}).then((success)=>{

        res.status(200).json({

            message:"fetched successfully",
            RestaurantData:success
        })
    }).catch((err)=>{

        res.status(500).json({
            
            message:"data fetching failed",
            Error:err
        })
    })
}

/// applying filter options on Restaurant based on location-id, mealtype-id, cuisine, hcost, lcost, sort and paginationa and limit

exports.FilterRestaurants=(req,res)=>{

    const {
        mealtype,
        location,
        cuisine,
        hcost,
        lcost,
        sort=1,
        page=1
    }=req.body;
    let filters={};

   if(mealtype){
       
      filters.mealtype_id=mealtype
   }
   if(location){
       filters.location_id=location
   }
   if(cuisine){
       
        filters["cuisine.name"]=cuisine
   }
   if(hcost)
   {
       filters.min_price={
           $lt:hcost
       }
   }
   if(lcost){
       
      filters.min_price={
          $gt:lcost
      }
   }
   if(lcost && hcost){

     filters.min_price={
         $lt:hcost,
         $gt:lcost
     }
   }

    Restaurants.find(filters).sort({min_price:sort}).then((success)=>{

        //pagination
        var result=success.slice(page*2-2,page*2)

        res.status(200).json({
            message:req.body,
            Restaurants:result
        })
    }).catch((err)=>{

        res.status(500).json({
            message:"error occured",
            Error:err
        })
    })
}





    

