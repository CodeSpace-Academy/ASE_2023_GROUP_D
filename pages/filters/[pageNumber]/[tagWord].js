
import { runFilter } from "@/fetching-data/data";
import RecipeList from "@/components/recipes/recipes-list";
import { useState } from "react";
import Link from "next/link";

function FilteredRecipes({ Recipesfiltered, pageNo }) {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  function handleAddTag() {
    if (newTag.trim() !== '') {
      setTags([...tags, newTag]);
      setNewTag(''); // Clear the input field after adding the tag
    }
  }

  function handleRemoveTag(tagToRemove) {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
  }

  // Filter the recipes based on all selected tags
  const filteredRecipes = Recipesfiltered.filter(recipe => {
    return tags.every(tag => recipe.tags.includes(tag));
  });

  return (
    <>
      <div>
        <label htmlFor="tag">Add Another Tag: </label>
        <input
          type="text"
          id="tagString"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button onClick={handleAddTag}>Add tag</button>
        <Link href={`/recipes/${_id}`}>
          <button>Back</button>
        </Link>
      </div>

      {tags.map((tag, index) => (
        <div key={index}>
          <button onClick={() => handleRemoveTag(tag)} key={tag}>{tag}</button>
          <RecipeList recipes={filteredRecipes} pageNo={pageNo} />
        </div>
      ))}


      <RecipeList recipes={filteredRecipes} pageNo={pageNo} />
    </>
  );
}

export async function getServerSideProps(context) {
  const pageNo = context.params.pageNumber;
  const tagWord = context.params.tagWord;
  const filteredRecipes1 = { tags: tagWord };
  console.log(pageNo);
  console.log(filteredRecipes1);
  const Recipesfiltered = await runFilter(pageNo, filteredRecipes1);

  return {
    props: {
      Recipesfiltered,
      pageNo,
    },
  };
}

export default FilteredRecipes;
