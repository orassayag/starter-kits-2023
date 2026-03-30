# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/starter-kits-2023/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment details (OS, Node version, npm/yarn/pnpm version)
   - Which starter kit you're using

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **JavaScript/React** for client applications
- **ESLint** for code quality
- **Airbnb style guide** as the base configuration

Before submitting:
```bash
# Install dependencies
npm install
# or
pnpm install

# Check for linting errors
npm run lint

# Build to ensure no errors
npm run build

# Test the application
npm run dev
```

### Coding Standards

1. **Component structure**: Follow React best practices and hooks patterns
2. **Error handling**: Handle errors gracefully with user-friendly messages
3. **Naming conventions**: Use clear, descriptive names for variables, functions, and components
4. **File organization**: Keep components modular and focused
5. **Documentation**: Add comments for complex logic or non-obvious implementations
6. **Material-UI**: Follow Material-UI patterns for styling and theming
7. **Validation**: Use Yup/Joi for proper input validation

### Working with Starter Kits

When contributing to a specific starter kit:
1. Navigate to the appropriate directory under `starter-kits/`
2. Read the starter kit's README.md and INSTRUCTIONS.md
3. Make changes specific to that starter kit
4. Test thoroughly before submitting
5. Update documentation if you add new features

### Adding New Starter Kits

If you want to add a new starter kit:
1. Create a new directory under `starter-kits/` with a descriptive name
2. Include all necessary files (package.json, README.md, INSTRUCTIONS.md, CONTRIBUTING.md, LICENSE)
3. Follow the existing structure and patterns
4. Document setup instructions clearly
5. Add the new kit to the main README.md

### Server-Side Contributions

For Node.js/Express server contributions:
1. Follow the existing middleware pattern
2. Use proper validation (Joi)
3. Include Swagger documentation for new endpoints
4. Maintain proper logging with Winston
5. Handle errors consistently

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏
