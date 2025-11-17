#!/usr/bin/env python3
"""
Script to create a new post in the Astro content folder.
Lists all available folders in src/content and lets you choose where to create the post.
"""

import os
import re
from datetime import datetime
from pathlib import Path


def slugify(text):
    """Convert text to a URL-friendly slug."""
    # Convert to lowercase
    text = text.lower()
    # Replace spaces and underscores with hyphens
    text = re.sub(r'[\s_]+', '-', text)
    # Remove all non-alphanumeric characters except hyphens
    text = re.sub(r'[^a-z0-9\-]', '', text)
    # Remove multiple consecutive hyphens
    text = re.sub(r'-+', '-', text)
    # Remove leading and trailing hyphens
    text = text.strip('-')
    return text


def get_input(prompt, default=None, required=True):
    """Get user input with optional default value."""
    if default:
        full_prompt = f"{prompt} [{default}]: "
    else:
        full_prompt = f"{prompt}: "
    
    while True:
        value = input(full_prompt).strip()
        if value:
            return value
        elif default:
            return default
        elif not required:
            return None
        else:
            print("This field is required. Please enter a value.")


def get_date_input(prompt, default=None):
    """Get a date input from the user."""
    if default:
        full_prompt = f"{prompt} [{default}]: "
    else:
        full_prompt = f"{prompt} (YYYY-MM-DD): "
    
    while True:
        value = input(full_prompt).strip()
        if not value and default:
            return default
        if not value:
            return None
        
        # Validate date format
        try:
            datetime.strptime(value, "%Y-%m-%d")
            return value
        except ValueError:
            print("Invalid date format. Please use YYYY-MM-DD (e.g., 2025-01-15)")


def get_collection_folder(script_dir):
    """List all folders in src/content and let user choose."""
    content_dir = script_dir / "src" / "content"
    
    if not content_dir.exists():
        print(f"Error: Content directory not found at {content_dir}")
        return None
    
    # Get all directories in content folder
    folders = [d.name for d in content_dir.iterdir() if d.is_dir()]
    
    if not folders:
        print("Error: No folders found in src/content")
        return None
    
    # Sort folders for consistent display
    folders.sort()
    
    # Display available folders
    print("Available content folders:")
    for i, folder in enumerate(folders, 1):
        print(f"  {i}. {folder}")
    print()
    
    # Get user selection
    while True:
        try:
            choice = input(f"Select folder (1-{len(folders)}) or enter folder name [1]: ").strip()
            
            # If empty, default to first folder
            if not choice:
                return folders[0]
            
            # Try to parse as number
            try:
                index = int(choice) - 1
                if 0 <= index < len(folders):
                    return folders[index]
                else:
                    print(f"Invalid number. Please enter a number between 1 and {len(folders)}.")
            except ValueError:
                # Not a number, treat as folder name
                if choice in folders:
                    return choice
                else:
                    print(f"Invalid folder name. Please choose from: {', '.join(folders)}")
        except KeyboardInterrupt:
            print("\nCancelled.")
            return None


def get_categories():
    """Get categories from the user (can be multiple)."""
    categories_input = get_input("Category (comma-separated for multiple)", required=True)
    categories = [cat.strip() for cat in categories_input.split(",") if cat.strip()]
    return categories


def format_frontmatter(data):
    """Format the frontmatter as YAML."""
    lines = ["---"]
    
    lines.append(f"title: \"{data['title']}\"")
    lines.append(f"pubDate: \"{data['pubDate']}\"")
    
    # Format category - single string if one, array if multiple
    if len(data['category']) == 1:
        lines.append(f"category: \"{data['category'][0]}\"")
    else:
        lines.append("category:")
        for cat in data['category']:
            lines.append(f"  - \"{cat}\"")
    
    lines.append(f"description: \"{data['description']}\"")
    
    if data.get('updatedDate'):
        lines.append(f"updatedDate: \"{data['updatedDate']}\"")
    
    if data.get('heroImage'):
        lines.append(f"heroImage: \"{data['heroImage']}\"")
    
    lines.append("---")
    return "\n".join(lines)


def main():
    """Main function to create a new post."""
    print("=" * 60)
    print("Create New Post")
    print("=" * 60)
    print()
    
    # Determine script directory
    script_dir = Path(__file__).parent
    
    # Get collection folder
    collection = get_collection_folder(script_dir)
    if not collection:
        print("Failed to select collection folder.")
        return
    
    # Get post details
    title = get_input("Title", required=True)
    description = get_input("Description", required=True)
    categories = get_categories()
    
    # Get dates
    today = datetime.now().strftime("%Y-%m-%d")
    pub_date = get_date_input("Publication date", default=today)
    updated_date = get_date_input("Updated date (optional)", default=None)
    
    # Get hero image (optional)
    hero_image = get_input("Hero image path (optional)", required=False)
    
    # Generate slug from title
    slug = slugify(title)
    
    # Prepare data
    post_data = {
        'title': title,
        'description': description,
        'category': categories,
        'pubDate': pub_date,
        'updatedDate': updated_date if updated_date else None,
        'heroImage': hero_image if hero_image else None,
    }
    
    # Determine file path
    content_dir = script_dir / "src" / "content" / collection
    file_path = content_dir / f"{slug}.md"
    
    # Check if file already exists
    if file_path.exists():
        overwrite = input(f"\nFile {file_path} already exists. Overwrite? (y/N): ").strip().lower()
        if overwrite != 'y':
            print("Cancelled.")
            return
    
    # Create content directory if it doesn't exist
    content_dir.mkdir(parents=True, exist_ok=True)
    
    # Generate frontmatter
    frontmatter = format_frontmatter(post_data)
    
    # Create file content
    file_content = frontmatter + "\n\n"
    
    # Write file
    file_path.write_text(file_content, encoding='utf-8')
    
    print()
    print("=" * 60)
    print(f"✓ Post created successfully!")
    print(f"  Location: {file_path}")
    print(f"  Slug: {slug}")
    print("=" * 60)


if __name__ == "__main__":
    main()

