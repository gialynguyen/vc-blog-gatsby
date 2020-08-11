module.exports = {
    apps : [
        {
            name: "vc-blog-gatsby",
            script: "npm",
            args: "run serve",
            watch: false,
            max_restarts: 5,
            restart_delay: 1000,
            env: {
                "NODE_ENV": "production",
                "PORT": 9090,
            },
        }
    ]
}
    