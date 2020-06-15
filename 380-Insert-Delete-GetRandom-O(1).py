import random
import collections
class RandomizedSet:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.record=collections.OrderedDict()
        self.total=0

    def insert(self, val: int) -> bool:
        """
        Inserts a value to the set. Returns true if the set did not already contain the specified element.
        """
        if val in self.record:
            return False
        self.record[val]=0
        self.total+=1
        return True

    def remove(self, val: int) -> bool:
        """
        Removes a value from the set. Returns true if the set contained the specified element.
        """
        if val in self.record:
            del self.record[val]
            self.total-=1
            return True
        return False
        

    def getRandom(self) -> int:
        """
        Get a random element from the set.
        """
        idx=random.randrange(0,self.total)
        return list(self.record.keys())[idx]
        


# Your RandomizedSet object will be instantiated and called as such:
# obj = RandomizedSet()
# param_1 = obj.insert(val)
# param_2 = obj.remove(val)
# param_3 = obj.getRandom()