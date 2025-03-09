import os

# Set the frontend directory path
frontend_path = "src"
output_file = "frontend_code.txt"

# Function to collect file names and their content
def collect_frontend_code(directory):
    frontend_code = []
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith((".jsx", ".js", ".css", ".json")):  # Include JSX files
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read().strip()  # Strip to avoid empty files
                        if content:  # Skip empty files
                            relative_path = os.path.relpath(file_path, frontend_path)
                            frontend_code.append(f"### {relative_path}\n{content}\n\n")
                            print(f"Processed: {relative_path}")  # Debugging line
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")

    return frontend_code

# Collect frontend code
frontend_code_snippets = collect_frontend_code(frontend_path)

# Write to a file
if frontend_code_snippets:
    with open(output_file, "w", encoding="utf-8") as f:
        f.writelines(frontend_code_snippets)
    print(f"✅ Frontend code saved in {output_file}")
else:
    print("⚠️ No files were found or processed. Check your folder structure!")

