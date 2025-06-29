
import React from 'react';
import { TrendingUp, Shield, Clock, Users, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card dark:bg-card border-t border-border mt-auto">
      <div className="w-full px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* System Information */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-gradient-primary rounded-lg">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">Hedron AI</h4>
                <p className="text-xs text-muted-foreground">v2.1.0</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              AI-Powered Trading Dashboard
            </p>
          </div>

          {/* System Status */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">System Status</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">All trading systems operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Last update: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Technical Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Technical Support</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Secure and reliable trading</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © 2024 Hedron AI. Advanced Trading Systems - All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>Built for traders</span>
              <a 
                href="https://github.com/olucasmf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
