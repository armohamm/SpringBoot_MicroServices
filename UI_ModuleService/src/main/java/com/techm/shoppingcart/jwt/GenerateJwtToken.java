package com.techm.shoppingcart.jwt;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/loginService")
@Component
public class GenerateJwtToken {

	//private static final String jwtTokenCookieName = "JWT-TOKEN";
    private static final String signingKey = "my-jwt-secretkey";
    
    String token = null ;
    private static final Logger LOGGER = LoggerFactory.getLogger(GenerateJwtToken.class);
    String customlogger ="ADMS Loger::::";

	@RequestMapping(value="/generateToken",method = RequestMethod.POST)
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@CrossOrigin
	public String generateToken(HttpServletResponse httpServletResponse,@RequestBody String userCredentials) {
		
		LOGGER.info(customlogger+"GenerateJwtToken Started");
		LOGGER.info(customlogger+"Loggedin User Credentials ::" + userCredentials);
		JSONObject userCredjson = null;
		String username = null;
		String password = null;
		try {
			if (userCredentials != null)
				userCredjson = new JSONObject(userCredentials.toString());
			if (userCredjson != null) {
				username = userCredjson.optString("username");
				password = userCredjson.optString("password");
				LOGGER.info(customlogger+"Entered username ::"+username+"\t Entered password ::"+password);
				if(username !=null)
				token = JwtUtil.generateToken(signingKey, username,password);
				LOGGER.info(customlogger+"Generated JwtToken::: " +token);

			}
		} catch (Exception e) {
			LOGGER.error(customlogger+"Exception Occured in generateToken() method");
			e.printStackTrace();
		}

		return token;
	}
	
	
@RequestMapping(value= "/test")
	public String getmessage(){
		
		return "sucess";
	}
	
	
}
