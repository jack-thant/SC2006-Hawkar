class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False


class Trie:
    def __init__(self):
        """Initialize an empty Trie with a root node."""
        self.root = TrieNode()

    def insert(self, word):
        """Insert a word into the trie.

        Args:
            word (str): The word to insert
        """
        if not word:
            return

        current = self.root
        for char in word:
            if char not in current.children:
                current.children[char] = TrieNode()
            current = current.children[char]

        current.is_end_of_word = True

    def search(self, word):
        """Search for a word in the trie.

        Args:
            word (str): The word to search for

        Returns:
            bool: True if the word exists in the trie, False otherwise
        """
        if not word:
            return False

        current = self.root
        for char in word:
            if char not in current.children:
                return False
            current = current.children[char]

        return current.is_end_of_word

    def starts_with(self, prefix):
        """Check if there is any word that starts with the given prefix.

        Args:
            prefix (str): The prefix to check

        Returns:
            bool: True if there is at least one word with the prefix, False otherwise
        """
        if not prefix:
            return True

        current = self.root
        for char in prefix:
            if char not in current.children:
                return False
            current = current.children[char]

        return True

    def get_words_with_prefix(self, prefix):
        """Get all words that start with the given prefix.

        Args:
            prefix (str): The prefix to search for

        Returns:
            list: List of words with the given prefix
        """
        result = []
        if not prefix:
            return result

        # Find the node at the end of the prefix
        current = self.root
        for char in prefix:
            if char not in current.children:
                return result
            current = current.children[char]

        # Collect all words starting from this node
        self._collect_words(current, prefix, result)
        return result

    def _collect_words(self, node, prefix, result):
        """Helper method to recursively collect words from a node.

        Args:
            node (TrieNode): Current trie node
            prefix (str): Current prefix
            result (list): List to store collected words
        """
        if node.is_end_of_word:
            result.append(prefix)

        for char, child in node.children.items():
            self._collect_words(child, prefix + char, result)

    def delete(self, word):
        """Delete a word from the trie.

        Args:
            word (str): The word to delete

        Returns:
            bool: True if the word was deleted, False if it wasn't found
        """
        if not word:
            return False

        return self._delete_helper(self.root, word, 0)

    def _delete_helper(self, node, word, index):
        """Helper method to recursively delete a word.

        Args:
            node (TrieNode): Current trie node
            word (str): Word to delete
            index (int): Current character index

        Returns:
            bool: True if node can be deleted, False otherwise
        """
        if index == len(word):
            if not node.is_end_of_word:
                return False

            node.is_end_of_word = False

            return len(node.children) == 0

        char = word[index]
        if char not in node.children:
            return False

        should_delete_child = self._delete_helper(node.children[char], word, index + 1)

        if should_delete_child:
            del node.children[char]
            return not node.is_end_of_word and len(node.children) == 0

        return False
