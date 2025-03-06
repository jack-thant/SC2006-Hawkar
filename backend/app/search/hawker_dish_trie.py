from search.trie_tree import Trie


class HawkerDishTrie:
    def __init__(self):
        """Initialize a Trie for hawker and dish names."""
        self.hawker_trie = Trie()
        self.dish_trie = Trie()
        self.data_mapping = {
            "hawkers": {},  # Maps name -> hawker_id
            "dishes": {},  # Maps name -> dish_id
        }

    def populate_hawkers(self, hawkers):
        """
        Populate the trie with hawker names from the database.

        Args:
            hawkers (list): List of hawker dictionaries with 'id' and 'businessName' fields
        """
        for hawker in hawkers:
            hawker_name = hawker.get("businessName", "").lower()
            hawker_id = hawker.get("hawkerID")
            if hawker_name and hawker_id:
                self.hawker_trie.insert(hawker_name)
                self.data_mapping["hawkers"][hawker_name] = hawker_id

    def populate_dishes(self, dishes):
        """
        Populate the trie with dish names from the database.

        Args:
            dishes (list): List of dish dictionaries with 'id' and 'name' fields
        """
        for dish in dishes:
            dish_name = dish.get("dishName", "").lower()
            dish_id = dish.get("dishID")
            if dish_name and dish_id:
                self.dish_trie.insert(dish_name)
                self.data_mapping["dishes"][dish_name] = dish_id

    def search_hawkers(self, prefix):
        """
        Search for hawkers with names that match the given prefix.

        Args:
            prefix (str): The prefix to search for

        Returns:
            list: List of hawker names matching the prefix
        """
        return self.hawker_trie.get_words_with_prefix(prefix.lower())

    def search_dishes(self, prefix):
        """
        Search for dishes with names that match the given prefix.

        Args:
            prefix (str): The prefix to search for

        Returns:
            list: List of dish names matching the prefix
        """
        return self.dish_trie.get_words_with_prefix(prefix.lower())

    def search_all(self, prefix):
        """
        Search for both hawkers and dishes with names that match the given prefix.

        Args:
            prefix (str): The prefix to search for

        Returns:
            dict: Dictionary with hawker and dish matches
        """

        prefix = prefix.lower()
        return {
            "hawkers": self.search_hawkers(prefix),
            "dishes": self.search_dishes(prefix),
        }

    def get_hawker_id(self, hawker_name):
        """
        Get the ID of a hawker by name.

        Args:
            hawker_name (str): The hawker name

        Returns:
            int: Hawker ID if found, None otherwise
        """
        return self.data_mapping["hawkers"].get(hawker_name.lower())

    def get_dish_id(self, dish_name):
        """
        Get the ID of a dish by name.

        Args:
            dish_name (str): The dish name

        Returns:
            int: Dish ID if found, None otherwise
        """
        return self.data_mapping["dishes"].get(dish_name.lower())

    def add_hawker(self, hawker_name, hawker_id):
        """
        Add a hawker to the search index.

        Args:
            hawker_name (str): The name of the hawker
            hawker_id (int): The ID of the hawker

        Returns:
            bool: True if added successfully, False otherwise
        """
        if not hawker_name or not hawker_id:
            return False

        # Convert to lowercase for consistency
        hawker_name = hawker_name.lower()

        self.populate_hawkers([{"hawkerID": hawker_id, "businessName": hawker_name}])

        return True
    
    def add_dish(self, dish_name, dish_id):
        """
        Add a dish to the search index.

        Args:
            dish_name (str): The name of the dish
            dish_id (int): The ID of the dish

        Returns:
            bool: True if added successfully, False otherwise
        """
        if not dish_name or not dish_id:
            return False

        # Convert to lowercase for consistency
        dish_name = dish_name.lower()

        self.populate_dishes([{"dishID": dish_id, "dishName": dish_name}])

        return True

    def remove_hawker(self, hawker_name):
        """
        Remove a hawker from the search index.

        Args:
            hawker_name (str): The name of the hawker to remove

        Returns:
            bool: True if removed successfully, False otherwise
        """
        if not hawker_name:
            return False

        # Convert to lowercase for consistency
        hawker_name = hawker_name.lower()

        # Delete from trie
        success = self.hawker_trie.delete(hawker_name)

        # Delete from data mapping
        if hawker_name in self.data_mapping["hawkers"]:
            del self.data_mapping["hawkers"][hawker_name]

        return success

    def remove_dish(self, dish_name):
        """
        Remove a dish from the search index.

        Args:
            dish_name (str): The name of the dish to remove

        Returns:
            bool: True if removed successfully, False otherwise
        """
        if not dish_name:
            return False

        # Convert to lowercase for consistency
        dish_name = dish_name.lower()

        # Delete from trie
        success = self.dish_trie.delete(dish_name)

        # Delete from data mapping
        if dish_name in self.data_mapping["dishes"]:
            del self.data_mapping["dishes"][dish_name]

        return success

    def update_hawker(self, old_name, new_hawker):
        """
        Update a hawker in the search index.

        Args:
            old_name (str): The old name of the hawker
            new_hawker (dict): Dictionary with hawkerID and businessName

        Returns:
            bool: True if updated successfully, False otherwise
        """
        if not old_name or not new_hawker:
            return False

        # If name hasn't changed, just update the ID mapping
        new_name = new_hawker.get("businessName", "").lower()
        if new_name == old_name.lower():
            self.data_mapping["hawkers"][new_name] = new_hawker.get("hawkerID")
            return True

        # Remove old entry
        self.remove_hawker(old_name)

        # Add new entry
        self.populate_hawkers([new_hawker])

        return True

    def update_dish(self, old_name, new_dish):
        """
        Update a dish in the search index.

        Args:
            old_name (str): The old name of the dish
            new_dish (dict): Dictionary with dishID and dishName

        Returns:
            bool: True if updated successfully, False otherwise
        """
        if not old_name or not new_dish:
            return False

        # If name hasn't changed, just update the ID mapping
        new_name = new_dish.get("dishName", "").lower()
        if new_name == old_name.lower():
            self.data_mapping["dishes"][new_name] = new_dish.get("dishID")
            return True

        # Remove old entry
        self.remove_dish(old_name)

        # Add new entry
        self.populate_dishes([new_dish])

        return True


# Create a global instance for use in the application
hawker_dish_search = HawkerDishTrie()


# Function to initialize the search index with data from the database
def initialize_search_index(hawker_data, dish_data):
    """
    Initialize the search index with hawker and dish data.

    Args:
        hawker_data (list): List of hawker dictionaries
        dish_data (list): List of dish dictionaries
    """
    hawker_dish_search.populate_hawkers(hawker_data)
    hawker_dish_search.populate_dishes(dish_data)
