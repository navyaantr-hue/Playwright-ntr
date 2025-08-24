pipeline {
    agent any

    tools {
        nodejs "NodeJS-18"   // Make sure you have NodeJS-18 installed in Jenkins → Global Tool Configuration
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Clone your GitHub repo
                git branch: 'main', url: 'https://github.com/navyaantr-hue/Playwright-ntr.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm packages and Playwright browsers
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run your Playwright tests
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Archive test results for later viewing in Jenkins
            junit 'playwright-report/*.xml'  // If you have JUnit XML reports
        }
    }
}