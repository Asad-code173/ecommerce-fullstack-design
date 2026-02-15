import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { FaFolderPlus } from 'react-icons/fa6';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa';


interface Category {
  _id: string;
  name: string;
}

interface CategoryInput {
  name: string;
}

const Categories = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch("/api/v1/categories/get-category");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const result = await response.json();
      return result.data as Category[];
    }
  });

  // Now write update mutation
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const updateMutation = useMutation<
    Category,
    Error,
    { id: string; name: string }
  >({
    mutationFn: async ({ id, name }) => {
      const response = await fetch(
        `/api/v1/categories/update-category/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to update category");
      }

      const result = await response.json();
      return result.data as Category;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setEditingId(null);
      setEditValue("");
    },
  });


  // Insert category mutation
  const mutation = useMutation<Category, Error, CategoryInput>({
    mutationFn: async (newCategory: CategoryInput) => {
      const response = await fetch("/api/v1/categories/insert-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to create category");
      const result = await response.json();
      return result.data as Category;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setCategoryName("");
      setAddCategory(false);
    },
    onError: (err: any) => setError(err.message),
  });

  // Now write delete mutation
  const deleteMutation = useMutation<string, Error, string>({
    mutationFn: async (id) => {
      const response = await fetch(`/api/v1/categories/delete-category/${id}`, {
        method: "DELETE",
        credentials: "include"
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error("Failed to Delete Category")
      }
      return result

    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (err) => {
      console.log(err.message)
    }
  })


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
    setError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setError("Category is required");
      return;
    }
    mutation.mutate({ name: categoryName });
  };

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Card */}
        <div className="bg-gray-50 rounded-2xl shadow-md p-5 sm:p-6">

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
            Add Categories
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Label */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                Category
              </label>

              <Input
                value={categoryName}
                onChange={handleChange}
                placeholder="Mobiles"
                className={`w-full px-4 py-3 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${error ? "border-red-500" : "border-gray-300"
                  }`}
              />

              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Button */}
            <div>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition"
              >
                {mutation.isPending ? "Adding..." : "Add Category"}
              </Button>
            </div>

          </form>

        </div>


        {/* List Card */}
        <div className="mt-10">
          <div className="bg-gray-50 rounded-2xl shadow-md p-5 sm:p-6">

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
              List of Categories
            </h2>

            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 text-gray-600 font-medium pb-3 border-b">
              <div className="col-span-2">S.No</div>
              <div className="col-span-7">Categories</div>
              <div className="col-span-3 text-end">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y">
              {categories?.length ? (
                categories.map((category, index) => (
                  <div
                    key={category._id}
                    className="grid grid-cols-12 items-center py-4"
                  >
                    {/* S.No */}
                    <div className="col-span-2 text-gray-800">
                      {index + 1}
                    </div>

                    {/* Name */}
                    <div className="col-span-7 text-gray-800 font-medium">
                      {category.name}
                    </div>

                    <div className="col-span-3 flex justify-end gap-3 items-center">

                      {editingId === category._id ? (
                        <>
                          <input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="border px-2 py-1 rounded-md text-sm w-32"
                          />

                          <button
                            onClick={() =>
                              updateMutation.mutate({
                                id: category._id,
                                name: editValue,
                              })
                            }
                            disabled={updateMutation.isPending}
                            className="bg-black text-white px-3 py-1 rounded-md text-sm"
                          >
                            {updateMutation.isPending ? "Saving..." : "Save"}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(category._id);
                              setEditValue(category.name);
                            }}
                            className="bg-gray-200 hover:bg-gray-300 transition p-2 rounded-lg"
                          >
                            ✏️
                          </button>

                          <Button
                            onClick={() => deleteMutation.mutate(category._id)}
                            disabled={deleteMutation.isPending}
                            className="bg-red-100 hover:bg-red-200 text-red-600 transition px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
                          >
                            {deleteMutation.isPending ? "Deleting..." : <FaTrash />}
                          </Button>


                        </>
                      )}

                    </div>

                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-6">
                  No categories available.
                </p>
              )}
            </div>

          </div>
        </div>


      </div>
    </div>
  );

};

export default Categories;
