import requests

def get_states_by_country(country_name):
    try:
        # API URL to fetch states
        url = "https://countriesnow.space/api/v0.1/countries/states"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            countries = data.get("data", [])
            
            # Search for the requested country
            for country in countries:
                if country["name"].lower() == country_name.lower():
                    states = country.get("states", [])
                    if states:
                        print(f"\nStates in {country_name.title()}:")
                        for state in states:
                            print(f"- {state['name']}")
                        return
                    else:
                        print(f"\n{country_name.title()} does not have states listed in this API.")
                        return
            
            print(f"\nNo data found for the country '{country_name.title()}'.")
        else:
            print(f"Failed to fetch data. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    while True:
        country = input("\nEnter a country name (or type 'exit' to quit): ").strip()
        if country.lower() == 'exit':
            print("Exiting the program.")
            break
        get_states_by_country(country)
