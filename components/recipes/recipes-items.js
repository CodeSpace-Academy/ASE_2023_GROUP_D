import React from "react";
import Link from "next/link";

function RecipesItems(props) {
  const { title, description, category, servings, published, _id } = props;

  return (
    <li>
      <Link href={ `/recipe/${_id}` }>
        
          <h3>{title}</h3>
        
      </Link>
      <p>{description}</p>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Servings:</strong> {servings}</p>
      <p><strong>Published:</strong> {published}</p>
    </li>
  );
}

export default RecipesItems;
