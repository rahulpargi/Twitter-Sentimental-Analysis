import tweepy

class StreamListener(tweepy.StreamListener):
	def on_status(self,status):
		print(status.text)

	def on_error(self,status_code):
		if status_code==420:
			return False


auth = tweepy.OAuthHandler("8SEFfecpNr1MHqHocEwf6c9JD","tOB1i3AE2MsoyosAJxZpAIFEPZs5bfvdA7qY6x85yyW3cX0d22")
auth.set_access_token=("299198967-AeI0E1mxDTf0XyYeFKxW1tP3mKBT32uhQqIIPXFu","	PCZhcQCPILjJi38dPRDwdBFExusI4Zwxv7SWWj3fzSgYJ") 
api=tweepy.API(auth)

stream_listener=StreamListener()
stream=tweepy.Stream(auth=api.auth,listener=stream_listener)
stream.filter(track=["bitcoin","ripple","etherium","ripple"])