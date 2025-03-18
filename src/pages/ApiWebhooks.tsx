
import { useState } from "react";
import { Key, Plus, Copy, Eye, EyeOff, RotateCcw, Webhook, ArrowRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock API keys data
const initialApiKeys = [
  {
    id: "1",
    name: "Production Key",
    key: "itj_prod_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    created: "Jul 14, 2023",
    lastUsed: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    name: "Development Key",
    key: "itj_dev_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    created: "Jun 20, 2023",
    lastUsed: "1 day ago",
    status: "active",
  },
  {
    id: "3",
    name: "Test Key",
    key: "itj_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    created: "May 05, 2023",
    lastUsed: "1 month ago",
    status: "inactive",
  },
];

// Mock webhooks data
const initialWebhooks = [
  {
    id: "1",
    url: "https://example.com/webhooks/payments",
    events: ["payment.success", "payment.failed"],
    created: "Jul 10, 2023",
    status: "active",
  },
  {
    id: "2",
    url: "https://example.com/webhooks/subscriptions",
    events: ["subscription.created", "subscription.updated", "subscription.cancelled"],
    created: "Jun 15, 2023",
    status: "active",
  },
  {
    id: "3",
    url: "https://example.com/webhooks/clients",
    events: ["client.created", "client.updated"],
    created: "May 20, 2023",
    status: "inactive",
  },
];

const ApiWebhooks = () => {
  const [apiKeys, setApiKeys] = useState(initialApiKeys);
  const [webhooks, setWebhooks] = useState(initialWebhooks);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (id: string) => {
    setShowKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API & Webhooks</h1>
        <p className="text-muted-foreground">
          Manage your API keys and webhook endpoints
        </p>
      </div>

      <Tabs defaultValue="api-keys">
        <TabsList className="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Webhooks
          </TabsTrigger>
        </TabsList>
        
        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">API Keys</h2>
              <p className="text-sm text-muted-foreground">
                Create and manage your API keys for authentication
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell className="font-medium">{apiKey.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="font-mono text-xs">
                            {showKeys[apiKey.id] ? apiKey.key : `${apiKey.key.slice(0, 11)}...${apiKey.key.slice(-4)}`}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {showKeys[apiKey.id] ? (
                              <EyeOff className="h-3.5 w-3.5" />
                            ) : (
                              <Eye className="h-3.5 w-3.5" />
                            )}
                            <span className="sr-only">Toggle visibility</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => navigator.clipboard.writeText(apiKey.key)}
                          >
                            <Copy className="h-3.5 w-3.5" />
                            <span className="sr-only">Copy</span>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{apiKey.created}</TableCell>
                      <TableCell>{apiKey.lastUsed}</TableCell>
                      <TableCell>
                        <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>
                          {apiKey.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Regenerate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Revoke
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Learn how to authenticate and use our API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Authenticate your API requests by including your API key in the Authorization header:
                </p>
                <div className="rounded-md bg-secondary p-3 font-mono text-xs">
                  <div>Authorization: Bearer itj_YOUR_API_KEY</div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Rate Limits</h3>
                <p className="text-sm text-muted-foreground">
                  API requests are limited to 100 requests per minute. If you exceed this limit, 
                  you'll receive a 429 Too Many Requests response.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                View Full Documentation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Webhooks Tab */}
        <TabsContent value="webhooks" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Webhooks</h2>
              <p className="text-sm text-muted-foreground">
                Create and manage webhooks to receive real-time event notifications
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Webhook
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint URL</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell className="font-medium font-mono text-xs">
                        {webhook.url}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map((event, index) => (
                            <Badge key={index} variant="outline">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{webhook.created}</TableCell>
                      <TableCell>
                        <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                          {webhook.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Test</DropdownMenuItem>
                            <DropdownMenuItem>View Logs</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook Events</CardTitle>
              <CardDescription>
                Available events that can be sent to your webhook endpoints
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Payment Events</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-md border border-border p-3 text-sm">
                    <div className="font-medium">payment.success</div>
                    <div className="text-xs text-muted-foreground">
                      Triggered when a payment is successful
                    </div>
                  </div>
                  <div className="rounded-md border border-border p-3 text-sm">
                    <div className="font-medium">payment.failed</div>
                    <div className="text-xs text-muted-foreground">
                      Triggered when a payment fails
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Subscription Events</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-md border border-border p-3 text-sm">
                    <div className="font-medium">subscription.created</div>
                    <div className="text-xs text-muted-foreground">
                      Triggered when a subscription is created
                    </div>
                  </div>
                  <div className="rounded-md border border-border p-3 text-sm">
                    <div className="font-medium">subscription.updated</div>
                    <div className="text-xs text-muted-foreground">
                      Triggered when a subscription is updated
                    </div>
                  </div>
                  <div className="rounded-md border border-border p-3 text-sm">
                    <div className="font-medium">subscription.cancelled</div>
                    <div className="text-xs text-muted-foreground">
                      Triggered when a subscription is cancelled
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Client Events</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-md border border-border p-3 text-sm">
                    <div className="font-medium">client.created</div>
                    <div className="text-xs text-muted-foreground">
                      Triggered when a client is created
                    </div>
                  </div>
                  <div className="rounded-md border border-border p-3 text-sm">
                    <div className="font-medium">client.updated</div>
                    <div className="text-xs text-muted-foreground">
                      Triggered when a client is updated
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiWebhooks;
