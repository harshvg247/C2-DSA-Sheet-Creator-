import React, { useRef, useState } from "react";
import Subcategory from "./subcategory";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BeatLoaderComponent from "./beatLoader";
import { deleteCategoryAsync } from "../action/questionActions";
function Category({ category }) {
  const [isHidden, setIsHidden] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const downAroowRef = useRef(null);

  const dispatch = useDispatch();

  function handleDownBtnClick() {
    setIsHidden(!isHidden);
    if (isHidden) {
      downAroowRef.current.style.transform = "rotateX(180deg)";
    } else {
      downAroowRef.current.style.transform = "rotateX(0deg)";
    }
  }
  const handleDeleteCategory = async (e) => {
    // stopping propagation so that category doesn't drop down on clicking delete button
    e.stopPropagation();
    setDeleting(true);
    try {
      await dispatch(deleteCategoryAsync({ category: category.name })).unwrap();
      toast.success("Category deleted!");
    } catch (error) {
      toast.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div
        className={`mx-3 my-4 border-[1px] ${
          isHidden ? "border-font3" : "border-font2"
        }  bg-[#2B2D32] rounded text-font3 `}
      >
        <div
          className={`flex  justify-between px-6 items-center bg-secondary p-1 border-b-[1px] ${
            isHidden ? "border-font3" : "border-font2"
          } rounded hover:text-font1 hover:bg-tertiary`}
          onClick={handleDownBtnClick}
        >
          <span>{category?.name}</span>
          <div className="flex w-48 justify-around items-center">
            <span
              onClick={(e) => handleDeleteCategory(e)}
              className="w-1/4 flex justify-center items-center text-2xl text-red-400 hover:cursor-pointer hover:text-red-600 duration-300 z-10"
            >
              {deleting ? (
                <BeatLoaderComponent />
              ) : (
                <ion-icon name="remove"></ion-icon>
              )}
            </span>
            <span
              className="w-1/2 text-center duration-100 flex justify-center"
              ref={downAroowRef}
            >
              <ion-icon size="large" name="caret-down-sharp"></ion-icon>
            </span>
          </div>
        </div>
        {category?.subCategories.map((subCategory) => {
            // key = subCategory.name;
            return (
            !isHidden && (
              <Subcategory key={subCategory.name}
                subCategory={subCategory}
                categoryName={category.name}
              />
            )
          );
        })}
      </div>
    </>
  );
}

export default Category;
